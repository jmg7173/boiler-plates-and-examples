#!/bin/bash
docker network create app-dev
docker-compose -p api-fastapi-dev down
docker-compose -p api-fastapi-dev up -d
