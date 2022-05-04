FROM node:16 

WORKDIR  /app

COPY package*.json /app  

COPY . /app

ENV PATH ./.env.AAA_SECRET_TEXT:/app/.env:$PATH

RUN npm i 

CMD npm run start-prod