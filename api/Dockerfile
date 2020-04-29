FROM mhart/alpine-node:10.5.0

WORKDIR /api
COPY package*.json /api/
RUN apk --no-cache add --virtual builds-deps build-base python
RUN npm config set python /usr/bin/python
RUN npm i -g npm
RUN npm install
RUN npm rebuild bcrypt --build-from-source
RUN apk del builds-deps
COPY . /api/

EXPOSE 3001

CMD ["npm", "start"]