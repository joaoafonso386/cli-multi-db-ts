"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoDB = void 0;
const crud_1 = require("../base/crud");
const mongoose_1 = require("mongoose");
class MongoDB extends crud_1.Crud {
    connection;
    schema;
    constructor(connection, schema, schemaName) {
        super();
        this.connection = connection;
        this.schema = (0, mongoose_1.model)(schemaName, schema);
    }
    async create(item) {
        const hero = new this.schema(item);
        await hero.save();
        return hero;
    }
    async isConnected() {
        //1 for success connection, 0 for error
        try {
            await this.connect();
            return 1;
        }
        catch (e) {
            console.error(e);
            return 0;
        }
    }
    async connect() {
        return await (0, mongoose_1.connect)(this.connection)
            .then(() => console.log("Connected to MongoDB!"));
    }
    async read(item, limit = 10) {
        return this.schema.find(item, undefined).limit(limit);
    }
    async update(id, item) {
        return this.schema.updateOne({ _id: id }, { $set: item });
    }
    async delete(id) {
        return this.schema.deleteOne({ _id: id });
    }
    close() {
        return (0, mongoose_1.disconnect)();
    }
}
exports.MongoDB = MongoDB;
