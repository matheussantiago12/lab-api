FROM node:14.15.0 as builder

EXPOSE 3333

WORKDIR /usr/app

COPY package*.json ./

COPY .env.example .env
COPY . .

RUN npm install
RUN node ace build --production

CMD ["node", "server.js"]
