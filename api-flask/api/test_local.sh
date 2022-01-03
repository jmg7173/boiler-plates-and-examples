#!/bin/bash

cd ../docker/test
./run.sh 0
cd ../../api

IS_LOCAL=1 pytest -svv --cov=. --cov-report=term-missing

docker-compose -p api-flask-test -f ../docker/dev/docker-compose.yaml down
