FROM node:18-alpine

ARG NODE_ENV
ENV NODE_ENV=${NODE_ENV:-test}

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
RUN yarn build

EXPOSE 3000
CMD [ "yarn", "start" ]
