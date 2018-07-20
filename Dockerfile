FROM node:8.11.3-alpine

WORKDIR /usr/src/app

COPY package.json yarn.lock /usr/src/app/
RUN yarn install --production --no-progress

COPY . /usr/src/app

ENTRYPOINT ["node", "/usr/src/app/index.js"]
