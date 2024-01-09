## DEPLOYMENTS

# To start the postgres instance locally
docker compose -f postgres-compose.yml up -d


# To start the mongodb instance locally
docker compose -f mongodb-compose.yml up -d

## EXECUTIONS

docker kill $(docker ps -q) - kill all running containers