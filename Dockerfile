FROM node:16 

WORKDIR  /app

COPY package*.json /app  

COPY . /app

ENV GOOGLE_CLIENT_ID="${.env.process.AAA_SECRET_TEXT.GOOGLE_CLIENT_ID}"
ENV GOOGLE_CLIENT_SECRET="${.env.process.AAA_SECRET_TEXT.GOOGLE_CLIENT_SECRET}"
ENV GOOGLE_CALLBACK="${.env.process.AAA_SECRET_TEXT.GOOGLE_CALLBACK}"
ENV GOOGLE_REFRESH_TOKEN="${.env.process.AAA_SECRET_TEXT.GOOGLE_REFRESH_TOKEN}"
ENV DOMAIN="${.env.process.AAA_SECRET_TEXT.DOMAIN}"
ENV travisApiToken="${.env.process.AAA_SECRET_TEXT.travisApiToken}"
ENV squareApplicationId="${.env.process.AAA_SECRET_TEXT.squareApplicationId}"
ENV SQUARE_TOKEN="${.env.process.AAA_SECRET_TEXT.SQUARE_TOKEN}"
ENV squareBasePath="${.env.process.AAA_SECRET_TEXT.squareBasePath}"
ENV SQUARE_LOCATION_ID="${.env.process.AAA_SECRET_TEXT.SQUARE_LOCATION_ID}"
ENV Kubernetes_Cluster_DB="${.env.process.AAA_SECRET_TEXT.Kubernetes_Cluster_DB}"

RUN npm i 

CMD npm run start-prod
