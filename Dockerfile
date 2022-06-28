FROM node:16.15.0-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install && \
    npm install -g pm2

COPY . ./

EXPOSE 3200
EXPOSE 9200

CMD ["node", "index.js"]