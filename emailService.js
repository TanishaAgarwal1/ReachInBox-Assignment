"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchEmails = fetchEmails;
exports.sendEmailReply = sendEmailReply;
const googleapis_1 = require("googleapis");
const axios_1 = __importDefault(require("axios"));
// Fetch emails from Gmail or Outlook
function fetchEmails(accountType, accessToken) {
    return __awaiter(this, void 0, void 0, function* () {
        if (accountType === 'google') {
            const oauth2Client = new googleapis_1.google.auth.OAuth2();
            oauth2Client.setCredentials({ access_token: accessToken });
            const gmail = googleapis_1.google.gmail({ version: 'v1', auth: oauth2Client });
            const res = yield gmail.users.messages.list({ userId: 'me', q: 'is:unread' });
            return res.data.messages || [];
        }
        else if (accountType === 'outlook') {
            const res = yield axios_1.default.get('https://graph.microsoft.com/v1.0/me/mailFolders/inbox/messages', {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            return res.data.value;
        }
        throw new Error('Unsupported account type');
    });
}
// Send email replies using Gmail or Outlook
function sendEmailReply(accountType, accessToken, emailId, replyContent) {
    return __awaiter(this, void 0, void 0, function* () {
        if (accountType === 'google') {
            const oauth2Client = new googleapis_1.google.auth.OAuth2();
            oauth2Client.setCredentials({ access_token: accessToken });
            const gmail = googleapis_1.google.gmail({ version: 'v1', auth: oauth2Client });
            yield gmail.users.messages.send({
                userId: 'me',
                requestBody: {
                    raw: Buffer.from(replyContent).toString('base64'),
                },
            });
        }
        else if (accountType === 'outlook') {
            yield axios_1.default.post(`https://graph.microsoft.com/v1.0/me/messages/${emailId}/reply`, { comment: replyContent }, { headers: { Authorization: `Bearer ${accessToken}` } });
        }
        else {
            throw new Error('Unsupported account type');
        }
    });
}
