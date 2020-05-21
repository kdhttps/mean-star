FROM node:10

# Create app directory
WORKDIR /usr/src/app

ENV PRODUCTION=true

# Install app dependencies
# http://bitjudo.com/blog/2014/03/13/building-efficient-dockerfiles-node-dot-js/
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
RUN mkdir ./client
COPY ./server/package*.json ./
COPY ./client/package*.json ./client/

# If you are building your code for production
RUN npm ci --only=production
RUN cd ./client && npm ci --only=production

# Bundle app source
COPY ./server ./
COPY ./client ./client

# Build client
RUN npm install -g @angular/cli@8.3.20
RUN cd ./client && ng build && cp -R dist/client ../

EXPOSE 3000

CMD [ "npm", "start" ]