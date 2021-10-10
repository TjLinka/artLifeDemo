FROM node:latest as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY ./ .
RUN echo ${VUE_APP_BASEURL} > .env
RUN echo ${VUE_APP_BASEURL}
RUN echo 123
RUN npm run lint -- --fix
RUN npm run build

FROM nginx as production-stage
RUN mkdir /app
COPY --from=build-stage /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf
