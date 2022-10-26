# Build dependencies
FROM node:16-alpine as dependencies
WORKDIR /app
COPY package.json .
RUN npm i
COPY . .
RUN npm run migrate
# Build production image
FROM dependencies as builder
EXPOSE 3000
CMD npm run migrate && npm run start