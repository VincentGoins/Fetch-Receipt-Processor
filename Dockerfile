FROM node:19-bullseye-slim

WORKDIR /app

# Copy only package files first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY . .

EXPOSE 3000

ENV NAME=front-end-app

CMD ["npm", "start"]
