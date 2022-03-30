FROM node:16.3.0-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

ADD package.json /app/package.json
ADD yarn.lock /app/yarn.lock

RUN yarn install

ADD . /app