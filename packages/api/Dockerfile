FROM node:latest

WORKDIR /api

COPY package.json .env ./

RUN npm install

COPY . .

RUN npm run build

CMD ["node", "dist/index.js"]