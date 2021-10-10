FROM node:latest as build-stage
ARG VUE_APP_BASEURL
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY ./ .
RUN echo "VUE_APP_BASEURL=${VUE_APP_BASEURL}" >> .env
RUN npm run fix
RUN npm run build

FROM nginx as production-stage
RUN mkdir /app
COPY --from=build-stage /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf
