#!/bin/sh

if [ ! -d ./node_modules]; then
  echo "please, install dependencies (yarn install)"
  exit 1
fi

ROOT_PATH=$(pwd)

startMongo() {
  echo "prepared mongo database"
  if [ "$(docker ps -a | grep mongo)" ]; then
    docker stop mongo && docker rm mongo 
  fi

  docker run -d --name mongo -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=conexauser -e MONGO_INITDB_ROOT_PASSWORD=password mongo
}

startCore() {
  echo "Start Microservices Core"

  if [ "$(docker ps -a | grep core)" ]; then
    docker stop core && docker rm core && docker rmi core 
  fi 

  cd packages/core 
  docker build -t core . 
  docker run --name core -d --link mongo core 
  cd $ROOT_PATH
}

startLogin() {
  echo "Start Microservices Login"

  if [ "$(docker ps -a | grep login)" ]; then
    docker stop login && docker rm login && docker rmi login 
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