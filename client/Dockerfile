FROM mhart/alpine-node:10.5.0

WORKDIR /client
COPY package*.json /client/

RUN npm install

COPY . /client/

EXPOSE 3000

CMD ["npm", "start"]