FROM alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN apk add --update nodejs
COPY . .
EXPOSE 3000
CMD [ "node", "index.js" ]