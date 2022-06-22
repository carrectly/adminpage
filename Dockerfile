FROM node:16 

WORKDIR  /app

COPY package*.json /app  

COPY . /app

RUN apt update && apt install tzdata -y
ENV PATH ./.env:/app/.env:$PATH

#ENV TZ America/Chicago


RUN npm i 

CMD npm run start-prod