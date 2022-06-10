FROM node:17

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json /usr/src/app/
COPY tsconfig*.json /usr/src/app/
RUN npm install --legacy-peer-deps
RUN npm install --force
# Bundle app source
COPY . /usr/src/app
COPY ./codeway-project.json /usr/src/app/codeway-project.json
ENV GOOGLE_APPLICATION_CREDENTIALS="/usr/src/app/codeway-project.json"
EXPOSE 8080
CMD [ "npm", "start" ]






