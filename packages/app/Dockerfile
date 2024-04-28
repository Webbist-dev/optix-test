FROM node:latest

WORKDIR /app

COPY package.json package-lock.json .env ./

RUN npm install

COPY . .

RUN npm run build

RUN npm install -g serve

CMD ["serve", "-s", "dist", "-l", "5000"]