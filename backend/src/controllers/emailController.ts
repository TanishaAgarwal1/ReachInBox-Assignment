import { Request, Response } from 'express';
import { fetchEmails, sendEmailReply } from '../services/emailService';

export const getEmails = async (req: Request, res: Response) => {
  try {
    const emails = await fetchEmails(req.query.accountType as string, req.query.accessToken as string);
    res.json(emails);
  } catch (err) {
    const errorMessage = (err as Error).message; // Cast `err` to `Error`
    res.status(500).json({ error: errorMessage });
  }
};

export const replyToEmail = async (req: Request, res: Response) => {
  try {
    const { accountType, accessToken, emailId, replyContent } = req.body;
    await sendEmailReply(accountType, accessToken, emailId, replyContent);
    res.status(200).send('Reply sent successfully');
  } catch (err) {
    const errorMessage = (err as Error).message; // Cast `err` to `Error`
    res.status(500).json({ error: errorMessage });
  }
};
