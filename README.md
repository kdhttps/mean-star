# MEAN-STAR

![template](https://user-images.githubusercontent.com/39133739/82898842-90f32580-9f77-11ea-92f1-67aa09cfcdb4.png)

**MEAN STAR** is a starter application that helps you to easily start your project development with MEAN Stack technology. This project is mainly focused on the Security, integrated [OpenID Connect OAuth 2.0](https://www.oauth.com/oauth2-servers/openid-connect/) [Authorization Code PKCE Flow](https://developers.onelogin.com/openid-connect/guides/auth-flow-pkce) and [jwks jwt verification](https://auth0.com/docs/tokens/concepts/jwks). It uses the [AppAuth-JS](https://github.com/openid/AppAuth-JS) which provides the very generic facility to integrate [Authorization Code PKCE Flow](https://developers.onelogin.com/openid-connect/guides/auth-flow-pkce) with any Single-page Application(**SPA**) technology and with Any OpenID Connect Provider. 

There are so many OpenID Connect Provider. For Example: auth0, okta, keyclock, google, onelogin, gluu, etc...

Currently I am using [**auth0.com**](https://auth0.com). It is a good OpenID Connect provider. You can create free developer accound and test.

# Live

[https://mean-star.herokuapp.com](https://mean-star.herokuapp.com).


# Features
1. Integrated [AppAuth-JS](https://github.com/openid/AppAuth-JS) at front-end Application.
1. [OpenID Connect OAuth 2.0](https://www.oauth.com/oauth2-servers/openid-connect/) [Authorization Code PKCE Flow](https://developers.onelogin.com/openid-connect/guides/auth-flow-pkce) for Client Front-end Application.
1. Protected API using [jwks jwt verification](https://auth0.com/docs/tokens/concepts/jwks)
1. OpenID Connect OAuth 2.0 integration with any OP Providers.
1. User and token mapping and managing user sessions using [lru-cache](https://www.npmjs.com/package/lru-cache).
1. Production and development logger, helps to debug problems in production.
1. Dockerfile and docker-compose for easy development and deployment.
1. Covered Code Coverage

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

## Docker

For development

```sh
docker-compose build
docker-compose up
```

If you want to stop docker then press `ctrl + c + c`, `docker-compose down`.

# Deploy

There are many ways to deploy the application.

## Deploy using **PM2**

[PM2](https://www.npmjs.com/package/pm2) is a production process manager for Node.js applications with a built-in load balancer. It allows you to keep applications alive forever, to reload them without downtime and to facilitate common system admin tasks.

Follow the below steps for production:

1. Clone or move your code to server and install node_modules.

1. Install PM2
      ```sh
     npm i -g pm2
      ```

1. Make an angular production build.
      ```sh
      cd client
      ng build --prod
      ```

1. Move `client/dist/client` folder to `server/` so that node application serve it.
      ```sh
      cp -R client/dist/client server/
      ```
1. Start PM2 service. which runs your application in the background.
      ```sh
      export PRODUCTION=true # or you can add this in .env
      pm2 start index.js
      ```

## Deploy on NGINX

Angular is a front-end client application and deploy the client application on standard HTTP Server has several benefits. Please check here for [more details](https://stackoverflow.com/a/56302977/11286367).

Follow Below steps to deploy on Nginx:

1. Install NGINX Http Server
1. Clone or move your code on server and install node_modules.
1. Make an angular production build.
      ```sh
      cd client
      ng build --prod
      ```
1. Move `/client/dist/client/*` all files into `/var/www/html`
1. Start your node app using PM2. No need to set a production flag.
1. Added a Proxy Pass configuration for Node Application so that your front-end app can call it.

## Deploy using docker

Docker makes our task very easy. You need to install **docker** and **docker compose** on server.

Follow below steps for deploy using docker

1. Install **docker** and **docker compose**.
1. Configure `.env` and `environment.prod.ts`.
1. Build the docker image
      ```sh
      docker-compose build
      ``` 
1. Run docker
      ```sh
      docker-compose up
      ```

## Deploy on Heroku

First `create a new App` using Heroku dashboard and then follow the below step to build and deploy image on Heroku

```
heroku container:login
heroku container:push [image-name] -a [your-app-name]
heroku container:release [image-name] -a [your-app-name]
```

# Liecnse

[MIT](https://raw.githubusercontent.com/kdhttps/mean-star/master/LICENSE)
