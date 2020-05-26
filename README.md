# MEAN-STACK

MEAN STACK demo application which help you to easily start your project development with MEAN Stack technology. This project is mainly focused on the Security, integrated **OAuth 2.0** Authorization Code PKCE Flow and jwks jwt verification. It uses the [AppAuth-JS](https://github.com/openid/AppAuth-JS) which provide the very generic facility to integrate **Authorization code PKCE flow** with any Single page Application(**SPA**) technology and with Any OpenID Connect Provider. 

There are so many OpenID Connect Provider. For Example: auth0, okta, keyclock, google, onelogin, gluu, etc...

Currently I am using **auth0.com**. It is good OpenID Connect provider. You can create free developer accound and test.

# Versions

1. [M] Mongo DB >= 4.x
1. [E] Expressjs >= 4.x
1. [A] Angular >= 8.x.x
1. [N] Nodejs >= 10.x.x

# Prerequisite

1. Node JS >= 10.x.x
2. Mongo DB >= 4.x
3. Angular CLI >= 8.3.x, Install it using  `npm install -g @angular/cli@8.3.20`
4. OpenID Connect Provider and Client ID, Use your OpenID Provider to create new client.

# Install Packages

## Client

```sh
cd client
npm i
```

## Server

```sh
cd server
npm i
```

Install `npm i -g nodemon` for developement.

# Configurations

## Client

Set your OP(OpenID Connect Provider) Client configuration the [environments.ts](./client/src/environments.ts).

```
export const environment = {
  production: false,
  apiURL: 'http://localhost:3000',
  // OP Server configuration
  clientId: '<your_client_id>',
  opServer: '<your_op_server_url>',
  opServerUserInfoEndpoint: '/userinfo',
  opServerExtraParamsInAuthRequest: {
    audience: '<your_op_server_url>/api/v2/'
  },
  redirectURI: 'http://localhost:4200/callback',
  logoutRedirectURI: 'http://localhost:4200',
  scope: 'openid email profile',
};
```

For auth0.com, you need to set extra params to get Access Token in JWT form. Please [check here](https://github.com/kdhttps/auth0-angular-node) for solution. Every OpenID Connect provider has it's own configurations style so you may need to find out for JWT Access Token.

We need JWT Access Token so that we can use the **JWKS Public key** verification as Node JS Server side.

Use [environments.prod.ts](./client/src/environments.ts) for production environment setup.

## Server

Rename the from [.env.sample](./server/.env.sample) to **.env**. 

```
PORT=3000
DB_URL=mongodb://localhost:27017/mean
OP_SERVER_URL=<your_op_server_url>
USERINFO_ENDPOINT=<your_op_server_user_endpoint_path>
CORS_ORIGIN=http://localhost:4200
```

Set `PRODUCTION=true` for production.

# Start Applications

## Client

```sh
npm start
```

## Server

```sh
npm start
```

For development,

```sh
npm run dev
```

## Deploy on Heroku

First `create a new App` using Heroku dashboard and then follow the below step to build and deploy image on Heroku

```
heroku container:login
heroku container:push [image-name] -a [your-app-name]
heroku container:release [image-name] -a [your-app-name]
```

## Live

[https://mean-star.herokuapp.com](https://mean-star.herokuapp.com).

## Liecnse

MIT 