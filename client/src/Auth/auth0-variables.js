export const AUTH_CONFIG = {
  domain: process.env.REACT_APP_AUTH_DOMAIN,
  clientId: process.env.REACT_APP_AUTH_CLIENT_ID,
  callbackUrl: (process.env.NODE_ENV === 'production') ? process.env.REACT_APP_AUTH_CALLBACKURL : 'http://localhost:3000/callback'
}
