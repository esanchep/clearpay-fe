FROM node:15.14.0 as builder
RUN npm install
RUN ng build --prod
