# Build dependencies
FROM node:16-alpine as dependencies
WORKDIR /app
COPY package.json .
RUN npm i
RUN npm run migrate
COPY . . 
# Build production image
FROM dependencies as builder
EXPOSE 3000
CMD npm run start