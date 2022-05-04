FROM node:16 

WORKDIR  /app

COPY package*.json /app  

COPY . /app

ENV GOOGLE_CLIENT_ID="$GOOGLE_CLIENT_ID"
ENV GOOGLE_CLIENT_SECRET="$GOOGLE_CLIENT_SECRET"
ENV GOOGLE_CALLBACK="$GOOGLE_CALLBACK"
ENV GOOGLE_REFRESH_TOKEN="$GOOGLE_REFRESH_TOKEN"
ENV DOMAIN="$DOMAIN"
ENV travisApiToken="$travisApiToken"
ENV squareApplicationId="$squareApplicationId"
ENV SQUARE_TOKEN="$SQUARE_TOKEN"
ENV squareBasePath="$squareBasePath"
ENV SQUARE_LOCATION_ID="$SQUARE_LOCATION_ID"
ENV Kubernetes_Cluster_DB="$Kubernetes_Cluster_DB"

RUN npm i 

CMD npm run start-prod