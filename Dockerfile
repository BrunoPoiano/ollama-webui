FROM node:16

WORKDIR /usr/src/app

COPY ./vueapp/package*.json ./

RUN npm install

COPY ./vueapp .

CMD ["npm", "run", "dev"]