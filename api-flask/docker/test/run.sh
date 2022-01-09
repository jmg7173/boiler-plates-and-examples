IS_DOCKER=$1

if test -z $IS_DOCKER
then
  IS_DOCKER=1
fi

docker network create app-test
docker-compose -p api-flask-test -f ../dev/docker-compose.yaml down
docker-compose -p api-flask-test -f ../dev/docker-compose.yaml --env-file=./.env up -d
docker-compose -p api-flask-test -f ../dev/docker-compose.yaml rm -sf nginx

cnt=0
echo "waiting for 30 seconds to DB container up"
while ! docker-compose -p api-flask-test -f ../dev/docker-compose.yaml logs db | grep -q "ready to accept connections"; do
  sleep 1
  ((cnt++))
  if [ $cnt -ge 30 ]; then
    echo "Cannot configure DB container! Tear down containers..."
    docker-compose -p api-flask-test -f ../dev/docker-compose.yaml down
    exit -1
  fi
done
echo "DB container up!"
docker exec -t api-flask-test_api_1 bash -c "flask db upgrade"

if [ $IS_DOCKER -eq 1 ]; then
  docker exec -t api-flask-test_api_1 \
    bash -c "pytest -svv --cov=. --cov-report=term-missing"
  docker-compose -p api-flask-test -f ../dev/docker-compose.yaml down
  echo "Successfully finished pytest for api!"
fi
