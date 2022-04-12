FROM node:16 

WORKDIR  /app

COPY package*.json /app  

COPY . /app



ENV GOOGLE_CLIENT_ID=./secrets.js
ENV GOOGLE_CLIENT_SECRET=./secrets.js
ENV GOOGLE_CALLBACK=./secrets.js
ENV GOOGLE_REFRESH_TOKEN=./secrets.js
ENV DOMAIN=./secrets.js
ENV travisApiToken=./secrets.js
ENV squareApplicationId=./secrets.js
ENV SQUARE_TOKEN=./secrets.js
ENV squareBasePath=./secrets.js
ENV SQUARE_LOCATION_ID=./secrets.js

RUN npm i 

CMD npm run start-dev