FROM node:14-alpine

WORKDIR /home/node/app

COPY package*.json ./

RUN npm install
RUN npm install -g @babel/core @babel/cli


COPY . .

EXPOSE 8080

CMD [ "npm", "start"]