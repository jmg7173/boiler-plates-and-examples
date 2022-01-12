# API application with flask

[![codecov](https://codecov.io/gh/jmg7173/boiler-plates-and-examples/branch/main/graph/badge.svg?token=SF2LV9A3N8)](https://codecov.io/gh/jmg7173/boiler-plates-and-examples)

## Run flask app

### Development environment
```bash
cd docker/base
./build_docker.sh
cd ../dev
./run.sh
```

If some configuration in python package requirements (ex. `requirements.txt`) has changed,
you should run this commands:
```bash
cd docker/base
./build_docker.sh
cd ../dev
./run.sh
```

If some configuration in `nginx.conf` has changed, please up container again:
```bash
cd docker/dev
./run.sh
```


### On local with flask cli
```bash
# On managing db
FLASK_APP=manage:app flask db init
FLASK_APP=manage:app flask db migrate
FLASK_APP=manage:app flask db upgrade
FLASK_APP=manage:app flask db downgrade 
```

## Testing flask app
### When running only using docker
```bash
cd docker/test
./run.sh
```

### When running on local environment
```bash
cd api
./test_local.sh
```

### With pycharm pytest with coverage
* pytest configuration  
![pytest configuration](https://user-images.githubusercontent.com/9067305/148078370-2f945c3f-60c5-4283-be15-5595fc6e4f03.png)

* Before running pytest, script configuration  
![docker compose up configuration](https://user-images.githubusercontent.com/9067305/148078272-561efc1b-b467-498c-b26c-e0b9012bd5ad.png)

* (Optional) teardown loaded test container  
```bash
# On api directory,
docker-compose -p api-flask-test -f ../docker/dev/docker-compose.yaml down

# Or at docker/dev directory,
docker-compose -p api-flask-test down
```
