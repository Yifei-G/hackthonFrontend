FROM node:14

#ARG http_proxy
#ARG https_proxy

RUN mkdir /app

COPY . /app

WORKDIR /app

RUN npm install -g @vue/cli

RUN vue --version

RUN npm install

CMD ["npm", "run", "serve"]