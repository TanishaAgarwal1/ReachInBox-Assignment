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
exports.authRoutes = void 0;
const express_1 = __importDefault(require("express"));
const googleAuth_1 = require("../auth/googleAuth");
const outlookAuth_1 = require("../auth/outlookAuth");
exports.authRoutes = express_1.default.Router();
exports.authRoutes.get('/google', (req, res) => {
    res.redirect((0, googleAuth_1.getGoogleAuthUrl)());
});
exports.authRoutes.get('/google/callback', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const code = req.query.code;
    const tokens = yield (0, googleAuth_1.handleGoogleOAuthCallback)(code);
    res.json(tokens);
}));
exports.authRoutes.get('/outlook', (req, res) => {
    res.redirect((0, outlookAuth_1.getOutlookAuthUrl)());
});
exports.authRoutes.get('/outlook/callback', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const code = req.query.code;
    const tokens = yield (0, outlookAuth_1.handleOutlookOAuthCallback)(code);
    res.json(tokens);
}));
