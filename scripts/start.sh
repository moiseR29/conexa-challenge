#!/bin/bash

if [ ! -d ./node_modules]; then
  echo "please, install dependencies (yarn install)"
  exit 1
fi

echo "start"
node ./packages/core/build/index

#echo "prepared mongo database"
#docker run -d  --name mongo -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=conexauser -e MONGO_INITDB_ROOT_PASSWORD=password mongo

#echo "prepared microservices"
#echo "core"
#docker build -t core -f ./packages/core/Dockerfile && docker run --name core -d -p 8081:8080 --link mongo core