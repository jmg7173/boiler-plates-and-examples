docker network create app-dev
docker-compose -p api-flask-dev down
docker-compose -p api-flask-dev up -d
