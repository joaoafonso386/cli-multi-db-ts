import { Hero } from "../../types/mongo.types";
import { HeroReadOptions } from "../../types/types";
import { Crud } from "../base/crud";
import { connect, model, disconnect, Schema } from "mongoose";
export class MongoDB extends Crud {
    private schema

    constructor(private connection: string, schema: Schema, schemaName: string) {
        super()
        this.schema = model(schemaName, schema)
    }
 
    async create(item: Hero) {
        const hero = new this.schema(item)
        await hero.save();
        return hero
    }

    async isConnected() {
        //1 for success connection, 0 for error
        try {
            await this.connect()
            return 1
        } catch(e) {
            console.error(e)
            return 0
        }
    }

    async connect() {
        return await connect(this.connection)
            .then(() => console.log("Connected to MongoDB!"))
    }   

    async read(item: HeroReadOptions, limit = 10) {
        return this.schema.find(item, undefined).limit(limit)
    }

    async update(id: string | number, item: Hero) {
        return this.schema.updateOne({_id: id}, { $set: item })
    }

    async delete(id: string) {
        return this.schema.deleteOne({ _id: id })
    }

    close() {
        return disconnect()
    }

}