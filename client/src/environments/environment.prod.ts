export const environment = {
  production: true,
  apiURL: 'https://mean-stack.herokuapp.com',
  // OP Server configuration
  clientId: 'xGZxEAJhzlkuQUlWl90y1ntIX-0UDWHx',
  opServer: 'https://kdhttps.auth0.com',
  opServerUserInfoEndpoint: '/userinfo',
  opServerExtraParamsInAuthRequest: {
    audience: 'https://kdhttps.auth0.com/api/v2/'
  },
  redirectURI: 'https://mean-stack.herokuapp.com/callback',
  scope: 'openid email profile',
};