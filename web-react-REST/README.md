# Web application with React.js (with using RESTful backend)

> This application uses typescript >= 4.5.1. 

## Run React.js app

> Before running React.js application, please run proper backend application (ex. api-flask).
> React.js application also needs nginx container which hosts proxy server of entire application.
> Entire application contains api application and web application.
> Each backend application contains nginx configurations and docker compose files
> to launch nginx, database and API applications.

### Development environment
```bash
cd docker/base
./build_docker.sh
cd ../dev
./run.sh
```

If some configuration with npm package, environment variables or eslint and so on has changed,
you should run this commands:
```bash
cd docker/base
./build_docker.sh
cd ../dev
./run.sh
```

### Testing React.js app

**TBD**