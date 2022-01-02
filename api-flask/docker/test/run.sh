docker network create app-test
docker-compose -p api-flask-test -f ../dev/docker-compose.yaml down
docker-compose -p api-flask-test -f ../dev/docker-compose.yaml --env-file=./.env up -d
docker-compose -p api-flask-test -f ../dev/docker-compose.yaml rm -sf nginx

cnt=0
while ! docker-compose -p api-flask-test logs db | grep -q "ready to accept connections"; do
  echo "waiting for db container up"
  sleep 1
  ((cnt++))
  if [ $cnt -ge 10 ]; then
    echo "Cannot configure DB container! Tear down containers..."
    docker-compose -p api-flask-test -f ../dev/docker-compose.yaml down
    exit -1
  fi
done
echo "DB container up!"
