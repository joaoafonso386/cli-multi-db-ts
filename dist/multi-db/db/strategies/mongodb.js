"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoDB = void 0;
const mongo_types_1 = require("../types/mongo.types");
const crud_1 = require("./base/crud");
const mongoose_1 = require("mongoose");
class MongoDB extends crud_1.Crud {
    model = (0, mongoose_1.model)('Heroes', mongo_types_1.heroSchema);
    async create(item) {
        const hero = new this.model(item);
        await hero.save();
        return hero;
    }
    async isConnected() {
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
        return await (0, mongoose_1.connect)('mongodb://zigoto:zigoto@127.0.0.1:27017/heroes')
            .then(() => console.log("Connected to MongoDB!"));
    }
}
exports.MongoDB = MongoDB;
