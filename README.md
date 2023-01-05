<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Description
A simple NestJS API with TypeORM, MySQL, Swagger, Jest & Docker for a very simple parking lot management system.

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# start docker mysql container (if you don't have mysql server)
$ docker-compose up -d

# migration run
$ yarn typeorm migration:run

# seed the intial data
$ yarn seed

# development mode
$ yarn start:dev

# SQLite mode
$ NODE_ENV=test yarn start:dev

# production mode
$ npm run start:prod
```

## Authentication
After running the migration, you can use the following credentials to login:

```bash
username: rootuser
password: rootpassword
```

Send a POST request to /auth/login with the above credentials to get the JWT token.
After that, you can use the token to access the protected routes.
The token should be sent in the Authorization header with the Bearer prefix.

## Swagger
Head to http://localhost:3000/api to see the Swagger documentation.
You can also use docs/api-json.json file to import the API documentation to Postman.

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test database connection
$ yarn test:db
```

## Upload image to GPC Container Registry

```bash
# build image
$ docker build -t parking-lot-api .

# tag image
$ docker tag parking-lot-api gcr.io/parking-lot-292909/parking-lot-api:latest

# login to GCP Container Registry
$ gcloud auth configure-docker

# upload image to GCP Container Registry
$ docker push gcr.io/parking-lot-292909/parking-lot-api:latest
```

## Deploy to GCP Cloud Run

```bash
# deploy to GCP Cloud Run
$ gcloud run deploy parking-lot-api --image gcr.io/parking-lot-292909/parking-lot-api:latest --platform managed
```
