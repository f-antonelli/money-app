If you want to run test, first need to create a docker for postgres:

docker run --name tests -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=tests -p 5433:5432 -d postgres