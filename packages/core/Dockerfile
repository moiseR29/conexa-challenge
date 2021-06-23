FROM node:12.13.0 as base

WORKDIR /baseapp

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:12.13.0-alpine

WORKDIR /app

COPY --from=base /baseapp/package-lock.json /baseapp/package.json ./
COPY --from=base /baseapp/build /app/build
COPY --from=base /baseapp/node_modules /app/node_modules

#EXPOSE 8080

CMD ["npm","start"]