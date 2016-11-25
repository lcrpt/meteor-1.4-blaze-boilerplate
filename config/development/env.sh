#!/bin/bash

export MONGO_URL=mongodb://127.0.0.1:27017/meteor-boilerplate
export MPORT=9000
export CLUSTER_DISCOVERY_URL=mongodb://localhost:27017/mydb
export CLUSTER_ENDPOINT_URL=http://localhost:$MPORT
export CLUSTER_SERVICE=app
