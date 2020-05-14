export const environment = {
  production: true,
  apiURL: 'http://localhost:3000',
  // OP Server configuration
  clientId: 'xGZxEAJhzlkuQUlWl90y1ntIX-0UDWHx',
  opServer: 'https://kdhttps.auth0.com',
  opServerUserInfoEndpoint: '/userinfo',
  opServerExtraParamsInAuthRequest: {
    audience: 'https://kdhttps.auth0.com/api/v2/'
  },
  redirectURI: 'http://localhost:4200/callback',
  scope: 'openid email profile',
};