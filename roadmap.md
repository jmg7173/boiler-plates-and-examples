# Roadmap
Maybe it is too heavy for boilerplate project!

## Stage 1

### Backend
* [ ] Completing flask backend application
* [ ] Add migration command script from host running at docker container
* [ ] Add api using web socket
  * Candidates:
    * message between users
    * alert to user something? <-- maybe need admin account and propagate some announcement
      * propagate push alarm from admin?
* [ ] Add long-running tasks that using celery

### Frontend
* [ ] Add react query also (where to adjust?)
* [ ] Add web socket
* [ ] Add custom hooks for archiving example (ex. double click)

### Deployment
* [ ] Add deployment script (Add docker/bin)
  * [ ] gunicorn at backend, yarn build for frontend
* [ ] Add socket setting for web socket at nginx configuration

## Stage 2

### Backend
* [ ] Add Django/sanic/fastapi version api backend application
  * [ ] It keeps features at stage 1 backend application
  * [ ] On development, keep TDD (based on already used at flask test)
* [ ] Show coverage graph? (not meaning badge)
* [ ] Add OAuth (at login)?

### Frontend
* [ ] Add some UI package other than antd (ex. material UI)
* [ ] Add frontend test code
* [ ] Add mock up codes?
* [ ] Add OAuth (at login)?
* [ ] Upgrade to react 5.0.1
  * [ ] Obstacles: socket setting when working at development env

## Stage 3

### Backend
* [ ] Add graphql api application

### Frontend
* [ ] Add Vue.js
* [ ] Add Svelte
* [ ] Add graphql version react app

## Stage ?
* [ ] Add spring api application
* [ ] Add gRPC (but which feature uses it?)
* [ ] Add golang based api application
* [ ] Construct MSA architectured api application with test
* [ ] Add scroll view (like apple?)
