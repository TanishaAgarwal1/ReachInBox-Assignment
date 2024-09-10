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
exports.getOutlookAuthUrl = getOutlookAuthUrl;
exports.handleOutlookOAuthCallback = handleOutlookOAuthCallback;
const axios_1 = __importDefault(require("axios"));
const querystring_1 = __importDefault(require("querystring"));
const outlookOAuth2Config = {
    clientId: process.env.OUTLOOK_CLIENT_ID,
    clientSecret: process.env.OUTLOOK_CLIENT_SECRET,
    redirectUri: 'http://localhost:5000/auth/outlook/callback',
    authorizeEndpoint: 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize',
    tokenEndpoint: 'https://login.microsoftonline.com/common/oauth2/v2.0/token',
    scope: 'https://graph.microsoft.com/Mail.Read https://graph.microsoft.com/Mail.Send offline_access',
};
function getOutlookAuthUrl() {
    const authUrl = `${outlookOAuth2Config.authorizeEndpoint}?${querystring_1.default.stringify({
        client_id: outlookOAuth2Config.clientId,
        response_type: 'code',
        redirect_uri: outlookOAuth2Config.redirectUri,
        response_mode: 'query',
        scope: outlookOAuth2Config.scope,
    })}`;
    return authUrl;
}
function handleOutlookOAuthCallback(code) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield axios_1.default.post(outlookOAuth2Config.tokenEndpoint, querystring_1.default.stringify({
            client_id: outlookOAuth2Config.clientId,
            client_secret: outlookOAuth2Config.clientSecret,
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: outlookOAuth2Config.redirectUri,
        }), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
        return response.data;
    });
}
