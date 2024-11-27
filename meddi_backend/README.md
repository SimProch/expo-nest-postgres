### Meddi_backend

## Fill in env variables

- Fill in the environment variables
  - DATABASE_URL=<YOUR_DATABASE_URL>
    - If using docker setup, you can use the following - postgres://root:root@0.0.0.0:5432/meddi
  - JWT_SECRET=<YOUR_JWT_SECRET>
    - You can generate one at https://jwtsecret.com/generate
  - PORT=<YOUR_PORT>
  - WEATHER_FORECAST_PROVIDER_URI=<YOUR_FORECAST_PROVIDER_URI>
  - WEATHER_FORECAST_PROVIDER_API_KEY=<YOUR_FORECAST_PROVIDER_API_KEY>

## Running the backend

Make sure the docker is running, then open CLI and run the following:

```sh
make all
```

The command will
  - create a postgres DB in docker on port 5432
  - generate the DB migrations
  - push the DB structure
  - create a docker container with backend on port 3000
  - run both services in detached mode

Inspect the docker processes are running

```sh
docker ps
```

You should see 2 containers
  - `nest-docker-postgres` as the backend container
  - `postgres` as the DB container

## Using swagger

Swagger is located on the `localhost:port/swagger/api`