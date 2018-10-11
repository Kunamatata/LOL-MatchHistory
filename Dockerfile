FROM node:8.12.0

WORKDIR /usr/src/app/

COPY . .

WORKDIR /usr/src/app/server

RUN npm install

EXPOSE 3001

CMD ["node", "server.js"]