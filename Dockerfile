# Build dependencies
FROM node:16-alpine as dependencies
WORKDIR /app
COPY package.json .
RUN npm i
COPY . . 
# Build production image
FROM dependencies as builder
EXPOSE 8080
CMD npm run start