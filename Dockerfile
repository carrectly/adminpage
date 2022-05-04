FROM node:16 

WORKDIR  /app

COPY package*.json /app  

COPY . /app

ENV GOOGLE_CLIENT_ID="${.env.process.AAA_SECRET_TEXT}"
ENV GOOGLE_CLIENT_SECRET="${.env.process.AAA_SECRET_TEXT}"
ENV GOOGLE_CALLBACK="${.env.process.AAA_SECRET_TEXT}"
ENV GOOGLE_REFRESH_TOKEN="${.env.process.AAA_SECRET_TEXT}"
ENV DOMAIN="${.env.process.AAA_SECRET_TEXT}"
ENV travisApiToken="${.env.process.AAA_SECRET_TEXT}"
ENV squareApplicationId="${.env.process.AAA_SECRET_TEXT}"
ENV SQUARE_TOKEN="${.env.process.AAA_SECRET_TEXT}"
ENV squareBasePath="${.env.process.AAA_SECRET_TEXT}"
ENV SQUARE_LOCATION_ID="${.env.process.AAA_SECRET_TEXT}"
ENV Kubernetes_Cluster_DB="${.env.process.AAA_SECRET_TEXT}"

RUN npm i 

CMD npm run start-prod
