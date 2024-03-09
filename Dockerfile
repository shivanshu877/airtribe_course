# Stage 1: Build the Node.js application
FROM node:20 AS builder

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
COPY . .

# Stage 2: Create the production image
FROM node:20

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app .

EXPOSE 3000
CMD ["npm", "start"]
