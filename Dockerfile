FROM node:16

WORKDIR /usr/src/app

COPY ./package*.json ./

RUN apt-get update \ 
    && apt-get install \
    && apt-get install git \
    && npm install 

COPY . .

CMD ["npm", "run", "dev"]