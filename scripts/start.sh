#!/bin/bash

echo "prepared mongo database"
docker run -d  --name mongo -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=conexauser -e MONGO_INITDB_ROOT_PASSWORD=password mongo

echo ""