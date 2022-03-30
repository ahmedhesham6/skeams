FROM node:16.3.0-alpine

WORKDIR /app

ADD package.json /app/package.json
ADD yarn.lock /app/yarn.lock

RUN yarn install

ADD . /app