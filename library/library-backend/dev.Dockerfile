FROM node:14-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

# Install nodemon globally
RUN npm install -g nodemon

RUN npm install @apollo/server

COPY . .

CMD ["npm", "run", "dev"]

