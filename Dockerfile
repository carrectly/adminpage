FROM node:16 

WORKDIR  /app

COPY package*.json /app  

COPY . /app

ENV PATH ./.env:/app/.env:$PATH

RUN npm i 

CMD npm run start-prod