"use strict";
// Guide to access mongo shell inside docker container
/**
 * *Enter shell*
 * docker exec -it mongo_local bash
 *
 * *Create a new user for read/write access to a 'heroes' db inside container shell*
 * --eval "db.getSiblingDB('heroes').createUser({ user: 'zigoto', pwd: 'zigoto', roles: [{role: 'readWrite', db: 'heroes' }]})"
 *
 * *Authenticate User*
 * mongosh -u zigoto -p zigoto --authenticationDatabase heroes
 *
 * *Show dbs and use heroes db*
 * show dbs
 * use heroes
 *
 * *Create Collection Heroes*
 * db.createCollection('heroes')
 * show collections
 *
 * */
// CRUD for Mongo using heroes collection
/**
 *
 * *Create*
 * db.heroes.insertOne({ name: "Flash", power: "Velocity", birthDate: "1999-07-07"})
 *
 * *Read*
 * db.heroes.find()
 *
 * *Update*
 * db.heroes.find({name: 'Flash'})
 * db.heroes.updateOne({ _id: ObjectId($ID)},  { $set: { name: "Batman" }})
 *
 * *Delete*
 * db.heroes.deleteOne({ _id: ObjectId('659ca410b12fecab7fdfdfd7')})
 *
 *
 */
