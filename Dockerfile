# Set env
ARG DB_HOST=${{ secrets.DB_HOST }}
ARG DB_NAME=${{ secrets.DB_NAME }}
ARG DB_PWD=${{ secrets.DB_PWD }}
ARG DB_USER=${{ secrets.DB_USER }}

ENV DB_HOST=$DB_HOST
ENV DB_NAME=$DB_NAME
ENV DB_PWD=$DB_PWD
ENV DB_USER=$DB_USER
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
CMD npm run start