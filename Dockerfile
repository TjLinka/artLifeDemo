FROM node:16.14.2-buster as build-stage
ARG VUE_APP_BASEURL
ARG VUE_APP_ENVIRONMENT
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY ./ .
RUN echo ${VUE_APP_BASEURL} | grep "http" && echo "VUE_APP_BASEURL=${VUE_APP_BASEURL}" >> .env || true
RUN echo "VUE_APP_ENVIRONMENT=${VUE_APP_ENVIRONMENT}" >> .env
RUN npm run fix
RUN npm run build

FROM nginx as production-stage
RUN mkdir /app
COPY --from=build-stage /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf
