FROM node:6

WORKDIR /src

COPY package.json /src/package.json
RUN npm install --production

COPY . /src

CMD ["node", "/src/index.js"]
