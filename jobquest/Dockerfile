FROM nikolaik/python-nodejs:python3.11-nodejs18-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

RUN pip install selenium requests webdriver-manager

RUN apk update
RUN apk add chromium chromium-chromedriver

RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
