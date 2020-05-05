FROM mhart/alpine-node:10.5.0

WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install --silent

COPY . .

EXPOSE 8080

CMD ["npm", "start"]