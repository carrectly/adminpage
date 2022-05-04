FROM node:16 

WORKDIR  /app

COPY package*.json /app  

COPY . /app

ENV GOOGLE_CLIENT_ID=env.process.GOOGLE_CLIENT_ID
ENV GOOGLE_CLIENT_SECRET=env.process.GOOGLE_CLIENT_SECRET
ENV GOOGLE_CALLBACK=env.process.GOOGLE_CALLBACK
ENV GOOGLE_REFRESH_TOKEN=env.process.GOOGLE_REFRESH_TOKEN
ENV DOMAIN=env.process.DOMAIN
ENV travisApiToken=env.process.travisApiToken
ENV squareApplicationId=env.process.squareApplicationId
ENV SQUARE_TOKEN=env.process.SQUARE_TOKEN
ENV squareBasePath=env.process.squareBasePath
ENV SQUARE_LOCATION_ID=env.process.SQUARE_LOCATION_ID



RUN npm i 

CMD npm run start-prod
