FROM node:20-alpine

#set ENV
ARG NEXT_PUBLIC_API_URL

ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

# set working directory

RUN mkdir -p /usr/src/app
 
WORKDIR /usr/src/app

COPY package*.json /usr/src/app

RUN npm install --force

COPY . .

# build app

RUN npm run build

EXPOSE 3003

CMD ["npm", "run", "start"]