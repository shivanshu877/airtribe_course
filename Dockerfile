FROM node:20 AS builder

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
COPY . .

FROM node:20

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app .

EXPOSE 3000
CMD ["npm", "start"]
