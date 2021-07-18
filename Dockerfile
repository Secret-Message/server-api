FROM node:16

WORKDIR /usr/secret-message

COPY package.json .

RUN npm install --production\
    && npm install typescript -g

COPY . .

EXPOSE 3000

RUN tsc

CMD ["node", "./dist/server.js"]