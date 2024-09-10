import express from 'express';
import dotenv from 'dotenv';
import { authRoutes } from './routes/authRoutes';
import { emailRoutes } from './routes/emailRoutes';
import { initQueues } from './bullmq/queue';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/emails', emailRoutes);

// Initialize queues
initQueues();

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
