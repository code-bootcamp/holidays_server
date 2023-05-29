FROM node:16.14.0

COPY ./package.json /myfolder/
COPY ./yarn.lock /myfolder/
WORKDIR /myfolder/

RUN yarn install

COPY . /myfolder/

WORKDIR /myfolder

CMD yarn start:dev
