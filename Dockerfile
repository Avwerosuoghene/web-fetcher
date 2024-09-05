FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

ENV FORCE_COLOR=1


ENTRYPOINT ["npx", "web-fetcher-cli"]

CMD ["--help"]