FROM node:16 

WORKDIR  /app

COPY package*.json /app  

COPY . /app

ENV GOOGLE_CLIENT_ID=env.GOOGLE_CLIENT_ID
ENV GOOGLE_CLIENT_SECRET=env.GOOGLE_CLIENT_SECRET
ENV GOOGLE_CALLBACK=env.GOOGLE_CALLBACK
ENV GOOGLE_REFRESH_TOKEN=env.GOOGLE_REFRESH_TOKEN
ENV DOMAIN=env.DOMAIN
ENV travisApiToken=env.travisApiToken
ENV squareApplicationId=env.squareApplicationId
ENV SQUARE_TOKEN=env.SQUARE_TOKEN
ENV squareBasePath=env.squareBasePath



RUN npm i 

CMD npm run start-prod
