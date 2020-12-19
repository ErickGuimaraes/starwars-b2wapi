FROM node:13.11.0-alpine


WORKDIR /usr/src/app

COPY package*.json ./
RUN yarn install 

COPY . .

EXPOSE 3000

CMD [ "node", "src/index.js", "production"]