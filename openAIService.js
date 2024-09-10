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
exports.categorizeEmail = categorizeEmail;
exports.generateReply = generateReply;
const openai_1 = __importDefault(require("openai"));
const openai = new openai_1.default({
    apiKey: OPENAI_API_KEY, // Make sure the environment variable is set correctly
});
/**
 * Categorize an email into specific categories.
 * @param emailContent The content of the email to be categorized.
 * @returns A promise that resolves to the category of the email.
 */
function categorizeEmail(emailContent) {
    return __awaiter(this, void 0, void 0, function* () {
        const prompt = `Categorize the following email into one of these categories: "Interested", "Not Interested", "More information". Email content: ${emailContent}`;
        try {
            const response = yield openai.completions.create({
                model: 'text-davinci-003',
                prompt: prompt,
                max_tokens: 10,
            });
            return response.choices[0].text.trim();
        }
        catch (error) {
            console.error('Error categorizing email:', error);
            throw new Error('Failed to categorize email.');
        }
    });
}
/**
 * Generate a reply based on the provided email content.
 * @param emailContent The content of the email to generate a reply for.
 * @returns A promise that resolves to the generated reply.
 */
function generateReply(emailContent) {
    return __awaiter(this, void 0, void 0, function* () {
        const prompt = `Based on the following email content, generate an appropriate reply: ${emailContent}`;
        try {
            const response = yield openai.completions.create({
                model: 'text-davinci-003',
                prompt: prompt,
                max_tokens: 150,
            });
            return response.choices[0].text.trim();
        }
        catch (error) {
            console.error('Error generating reply:', error);
            throw new Error('Failed to generate a reply.');
        }
    });
}
