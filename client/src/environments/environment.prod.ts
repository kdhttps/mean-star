export const environment = {
  production: true,
  apiURL: 'https://mean-star.herokuapp.com',
  // Application Endpoints
  userEndpoint: '/users',
  // OP Server configuration
  clientId: 'xGZxEAJhzlkuQUlWl90y1ntIX-0UDWHx',
  opServer: 'https://kdhttps.auth0.com',
  opServerUserInfoEndpoint: '/userinfo',
  opServerExtraParamsInAuthRequest: {
    audience: 'https://kdhttps.auth0.com/api/v2/'
  },
  redirectURI: 'https://mean-star.herokuapp.com/callback',
  scope: 'openid email profile',
};
