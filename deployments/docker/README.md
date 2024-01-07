## DEPLOYMENTS

# To start the postgres instance locally
docker compose -f postgres-compose.yml up -d


# To start the mongodb instance locally
docker compose -f mongodb-compose.yml up -d
# Create a new user for read/write access to a 'heroes' db
docker exec -it mongo_local bash\
mongosh --host localhost -u admin -p admin --authenticationDatabase admin \
--eval "db.getSiblingDB('heroes').createUser({ user: 'zigoto', pwd: 'zigoto', roles: [{role: 'readWrite', db: 'heroes' }]})"



## EXECUTIONS

docker kill $(docker ps -q) - kill all running containers