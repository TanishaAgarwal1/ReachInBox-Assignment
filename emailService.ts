import { google } from 'googleapis';
import axios from 'axios';

// Fetch emails from Gmail or Outlook
export async function fetchEmails(accountType: string, accessToken: string) {
  if (accountType === 'google') {
    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({ access_token: accessToken });
    const gmail = google.gmail({ version: 'v1', auth: oauth2Client });
    const res = await gmail.users.messages.list({ userId: 'me', q: 'is:unread' });
    return res.data.messages || [];
  } else if (accountType === 'outlook') {
    const res = await axios.get('https://graph.microsoft.com/v1.0/me/mailFolders/inbox/messages', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return res.data.value;
  }
  throw new Error('Unsupported account type');
}

// Send email replies using Gmail or Outlook
export async function sendEmailReply(accountType: string, accessToken: string, emailId: string, replyContent: string) {
  if (accountType === 'google') {
    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({ access_token: accessToken });
    const gmail = google.gmail({ version: 'v1', auth: oauth2Client });
    await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: Buffer.from(replyContent).toString('base64'),
      },
    });
  } else if (accountType === 'outlook') {
    await axios.post(
      `https://graph.microsoft.com/v1.0/me/messages/${emailId}/reply`,
      { comment: replyContent },
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
  } else {
    throw new Error('Unsupported account type');
  }
}
