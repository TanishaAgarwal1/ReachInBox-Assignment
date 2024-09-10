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
Object.defineProperty(exports, "__esModule", { value: true });
exports.initQueues = initQueues;
exports.addEmailToQueue = addEmailToQueue;
const bullmq_1 = require("bullmq");
const openAIService_1 = require("../services/openAIService");
// Create the queue
const emailQueue = new bullmq_1.Queue('emailQueue');
function initQueues() {
    // Create a worker to process jobs from the queue
    const worker = new bullmq_1.Worker('emailQueue', (job) => __awaiter(this, void 0, void 0, function* () {
        const { emailContent } = job.data;
        const category = yield (0, openAIService_1.categorizeEmail)(emailContent);
        const replyContent = yield (0, openAIService_1.generateReply)(emailContent);
        // Perform further operations such as storing the reply or sending it
        return { category, replyContent };
    }));
    // Handle worker errors
    worker.on('failed', (job, err) => {
        if (job) { // Type guard to ensure `job` is not undefined
            console.error(`Job ${job.id} failed with error: ${err.message}`);
        }
        else {
            console.error(`A job failed, but the job is undefined. Error: ${err.message}`);
        }
    });
    worker.on('completed', (job, result) => {
        if (job) { // Type guard to ensure `job` is not undefined
            console.log(`Job ${job.id} completed with result:`, result);
        }
        else {
            console.log(`A job completed, but the job is undefined. Result:`, result);
        }
    });
}
function addEmailToQueue(emailContent) {
    return __awaiter(this, void 0, void 0, function* () {
        yield emailQueue.add('categorizeAndReply', { emailContent });
    });
}
