FROM node:16.0.0 as builder
RUN npm install
RUN ng build --prod
