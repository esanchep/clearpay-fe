FROM node:16.0.0 as builder
WORKDIR /usr/app
COPY ./ /usr/app
RUN npm install
RUN ng build --prod
