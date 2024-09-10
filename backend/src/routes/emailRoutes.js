"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailRoutes = void 0;
const express_1 = __importDefault(require("express"));
const emailController_1 = require("../controllers/emailController");
exports.emailRoutes = express_1.default.Router();
exports.emailRoutes.get('/', emailController_1.getEmails);
exports.emailRoutes.post('/reply', emailController_1.replyToEmail);
