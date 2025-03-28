FROM node:20

WORKDIR /Distance_Calculator

COPY package.json package-lock.json ./
RUN npm install

COPY . .


CMD ["node", "app.js"]
