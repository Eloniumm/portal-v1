FROM node:15-alpine3.13

WORKDIR /usr/src/app

# just cpy the package first to install deps
COPY package*.json ./

RUN npm ci --only=production

# cpy application into working directory
COPY . .

EXPOSE 8080

# let go
CMD [ "npm", "start" ]


