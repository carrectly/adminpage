FROM node:16 

WORKDIR  /app

COPY package*.json /app  

COPY . /app



ARG GOOGLE_CLIENT_ID=./secrets.js
ARG GOOGLE_CLIENT_SECRET=./secrets.js
ARG GOOGLE_CALLBACK=./secrets.js
ARG GOOGLE_REFRESH_TOKEN=./secrets.js
ARG DOMAIN=./secrets.js
ARG travisApiToken=./secrets.js
ARG squareApplicationId=./secrets.js
ARG SQUARE_TOKEN=./secrets.js
ARG squareBasePath=./secrets.js
ARG SQUARE_LOCATION_ID=./secrets.js

RUN npm i 

CMD npm run start-dev