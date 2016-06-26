#!/bin/bash

export MONGO_URL=mongodb://127.0.0.1:27017/atypicsdb
export MPORT=5100
export CLUSTER_DISCOVERY_URL=mongodb://localhost:27017/mydb
export CLUSTER_ENDPOINT_URL=http://localhost:$MPORT
export CLUSTER_SERVICE=app
