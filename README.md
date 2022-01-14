# Boiler plates and examples
![flask](https://github.com/jmg7173/boiler-plates-and-examples/actions/workflows/flask.yaml/badge.svg)
[![codecov](https://codecov.io/gh/jmg7173/boiler-plates-and-examples/branch/main/graph/badge.svg?token=SF2LV9A3N8)](https://codecov.io/gh/jmg7173/boiler-plates-and-examples)
> Currently, code coverage covers only api-flask directory.

## Prerequisites
* [Docker](https://docs.docker.com/engine/) (>= 20.10.11, build dea9396)
* [docker-compose](https://docs.docker.com/compose/) (>= v2.2.1)
* (For personal computers) [Docker Desktop](https://docs.docker.com/desktop/) (>= 4.3.1)

> For windows user, check this question - symbolic link issue: https://stackoverflow.com/a/42137273

## How to run?
1. Select backend framework directory (ex. api-flask)
2. Select frontend framework directory (ex. web-react-REST)
3. See README.md of both directory

## Covering frameworks
### Backend frameworks
* Python (above 3.10.0)
  * Synchronous RESTful API frameworks
    * **Flask** (On going)
    * Django (Not implemented)
  * Asynchronous RESTful API frameworks
    * Sanic (Not implemented)

* Typescript (above 4.5.2)
  * GraphQL (Not implemented)
    * Apollo
    * Prisma

### Frontend frameworks with Typescript
* **React.js** (On going)
* Vue.js (Not implemented)

### UI package
* React - antd

### Database
* Postgres

## Python RESTful API Backends with React.js

### Synchronous RESTful API freameworks
* Flask with React.js
* Django with React.js

### Asynchronous RESTful API frameworks
* Sanic with React.js

## Typescript GraphQL Backends with React.js
* Apollo with React.js
* Prisma with React.js

## With Vue.js
* Sanic with Vue.js
* Apollo with Vue.js

# Included features
~~feature~~ are implemented.
* User
  * ~~signup / login / logout / JWT token management~~
* Websocket
* Task runner with celery
* Frontend examples
  * React
    * Custom hooks
    * ~~antd UI customizing~~
    * ~~Modal~~
  * Mocking up backend api
* ~~CI~~
* ~~GitHub Action~~
  * ~~Lint, Testing~~
* ~~Dependabot~~
* ~~Test codes with code coverage~~
* OAuth (with google)

# TODOs
* [x] CI
  * Auto lint check
  * Check test code passed
* Test codes
  * [x] Backend
  * [ ] Frontend
  * [x] code coverage
* [x] Dependabot
