FROM node:16

LABEL org.opencontainers.image.description="vulnerable-node" \
      org.opencontainers.image.authors="RoxsRoss" 

# Build app folders
RUN mkdir /app
WORKDIR /app

# Install depends
COPY package.json /app/
RUN npm install

# Bundle code
COPY . /app

EXPOSE 3000

CMD [ "npm", "start" ]
