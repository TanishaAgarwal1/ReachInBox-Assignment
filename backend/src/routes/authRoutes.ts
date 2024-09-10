import express from 'express';
import { getGoogleAuthUrl, handleGoogleOAuthCallback } from '../auth/googleAuth';
import { getOutlookAuthUrl, handleOutlookOAuthCallback } from '../auth/outlookAuth';

export const authRoutes = express.Router();

authRoutes.get('/google', (req, res) => {
  res.redirect(getGoogleAuthUrl());
});

authRoutes.get('/google/callback', async (req, res) => {
  const code = req.query.code as string;
  const tokens = await handleGoogleOAuthCallback(code);
  res.json(tokens);
});

authRoutes.get('/outlook', (req, res) => {
  res.redirect(getOutlookAuthUrl());
});

authRoutes.get('/outlook/callback', async (req, res) => {
  const code = req.query.code as string;
  const tokens = await handleOutlookOAuthCallback(code);
  res.json(tokens);
});
