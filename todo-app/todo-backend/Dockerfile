FROM node:16

WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install app dependencies
RUN npm install

COPY . .

CMD ["npm", "start"]
