#!/bin/sh

if [ ! -d ./node_modules]; then
  echo "please, install dependencies (yarn install)"
  exit 1
fi

ROOT_PATH=$(pwd)

startMongo() {
  echo "prepared mongo database"
  if [ "$(docker ps -a | grep mongo)" ]; then
    docker stop mongo && docker start mongo 
  else
    docker run -d --name mongo -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=conexauser -e MONGO_INITDB_ROOT_PASSWORD=password mongo
  fi
}

startCore() {
  echo "Start Microservices Core"

  cd packages/core 
  docker build -t core . 
  docker run --name core -d -p 8080:8080 --link mongo core 
  cd $ROOT_PATH
}

startLogin() {
  echo "Start Microservices Login"

  if [ ! "$(docker ps -a | grep core)" ]; then
    echo "por favor levanta el core"
    exit 1
  fi

  cd packages/login 
  docker build -t login . 
  docker run --name login -d -p 8090:8090 --link core login
  cd $ROOT_PATH
}

startMongo
echo $ROOT_PATH
startCore
echo $ROOT_PATH
startLogin