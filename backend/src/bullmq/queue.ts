import { Queue, Worker, Job } from 'bullmq';
import { categorizeEmail, generateReply } from '../services/openAIService';

// Create the queue
const emailQueue = new Queue('emailQueue');

export function initQueues() {
  // Create a worker to process jobs from the queue
  const worker = new Worker('emailQueue', async (job: Job) => {
    const { emailContent } = job.data as { emailContent: string };
    const category = await categorizeEmail(emailContent);
    const replyContent = await generateReply(emailContent);
    // Perform further operations such as storing the reply or sending it
    return { category, replyContent };
  });

  // Handle worker errors
  worker.on('failed', (job, err) => {
    if (job) {  // Type guard to ensure `job` is not undefined
      console.error(`Job ${job.id} failed with error: ${err.message}`);
    } else {
      console.error(`A job failed, but the job is undefined. Error: ${err.message}`);
    }
  });

  worker.on('completed', (job, result) => {
    if (job) {  // Type guard to ensure `job` is not undefined
      console.log(`Job ${job.id} completed with result:`, result);
    } else {
      console.log(`A job completed, but the job is undefined. Result:`, result);
    }
  });
}

export async function addEmailToQueue(emailContent: string) {
  await emailQueue.add('categorizeAndReply', { emailContent });
}
