FROM node:16 

WORKDIR  /app

COPY package*.json /app  

COPY . /app

ENV .env=.env.process.AAA_SECRET_TEXT

RUN npm i 

CMD npm run start-prod