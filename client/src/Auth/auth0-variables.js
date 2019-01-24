export const AUTH_CONFIG = {
  domain: 'midwaste.auth0.com',
  clientId: '2o5Whwo8daNgkGgpGT17ZOxUOOIMNgS6',
  callbackUrl: (process.env.NODE_ENV === 'production') ? 'http://midwatse.herokuapp.com/callback' : 'http://localhost:3000/callback'
}
