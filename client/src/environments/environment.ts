// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiURL: 'http://localhost:3000',
  // Application Endpoints
  userEndpoint: '/users',
  userLoginEndpoint: '/users/login',

  // Blog endpoint
  blogEndpoint: '/blogs',

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

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
