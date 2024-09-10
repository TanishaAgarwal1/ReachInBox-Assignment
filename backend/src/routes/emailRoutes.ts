import express from 'express';
import { getEmails, replyToEmail } from '../controllers/emailController';

export const emailRoutes = express.Router();

emailRoutes.get('/', getEmails);
emailRoutes.post('/reply', replyToEmail);
