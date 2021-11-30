# pull official base image
FROM node:13.12.0-alpine

# set the working direction
WORKDIR /app

RUN apk --no-cache add --virtual builds-deps build-base python3

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY ./package*.json ./

RUN npm install

# add app
COPY . ./

EXPOSE 3000

# start app
CMD ["npm", "start"]