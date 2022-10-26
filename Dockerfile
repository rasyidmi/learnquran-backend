# Set env
RUN --mount=type=secret,id=DB_HOST \
  --mount=type=secret,id=DB_USER \
  --mount=type=secret,id=DB_PWD \
  --mount=type=secret,id=DB_NAME \
   export DB_HOST=$(cat /run/secrets/DB_HOST) && \
   export DB_USER=$(cat /run/secrets/DB_USER) && \
   export DB_PWD=$(cat /run/secrets/DB_PWD) && \
   export DB_NAME=$(cat /run/secrets/DB_NAME) && \
   yarn gen
ARG ENV=dev

ENV ENV=$ENV
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