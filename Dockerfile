FROM node

WORKDIR /nodejs-hw-rest-api-contacts

COPY . .

RUN npm install

EXPOSE 2217

CMD ["node", "server"]