import axios from 'axios';
import querystring from 'querystring';

const outlookOAuth2Config = {
  clientId: process.env.OUTLOOK_CLIENT_ID!,
  clientSecret: process.env.OUTLOOK_CLIENT_SECRET!,
  redirectUri: 'http://localhost:5000/auth/outlook/callback',
  authorizeEndpoint: 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize',
  tokenEndpoint: 'https://login.microsoftonline.com/common/oauth2/v2.0/token',
  scope: 'https://graph.microsoft.com/Mail.Read https://graph.microsoft.com/Mail.Send offline_access',
};

export function getOutlookAuthUrl() {
  const authUrl = `${outlookOAuth2Config.authorizeEndpoint}?${querystring.stringify({
    client_id: outlookOAuth2Config.clientId,
    response_type: 'code',
    redirect_uri: outlookOAuth2Config.redirectUri,
    response_mode: 'query',
    scope: outlookOAuth2Config.scope,
  })}`;
  return authUrl;
}

export async function handleOutlookOAuthCallback(code: string) {
  const response = await axios.post(
    outlookOAuth2Config.tokenEndpoint,
    querystring.stringify({
      client_id: outlookOAuth2Config.clientId,
      client_secret: outlookOAuth2Config.clientSecret,
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: outlookOAuth2Config.redirectUri,
    }),
    { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
  );

  return response.data;
}
