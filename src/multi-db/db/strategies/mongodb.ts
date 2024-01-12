import { Hero, heroSchema } from "../types/mongo.types";
import { HeroReadOptions } from "../types/types";
import { Crud } from "./base/crud";
import { connect, model, disconnect } from "mongoose";
export class MongoDB extends Crud {
    private model = model<Hero>('Heroes', heroSchema)
 
    async create(item: Hero) {
        const hero = new this.model(item)
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
        return await connect('mongodb://zigoto:zigoto@127.0.0.1:27017/heroes')
            .then(() => console.log("Connected to MongoDB!"))
    }   

    async read(item: HeroReadOptions, limit = 10) {
        return this.model.find(item, undefined).limit(limit)
    }

    async update(id: string | number, item: Hero) {
        return this.model.updateOne({_id: id}, { $set: item })
    }

    async delete(id: string) {
        return this.model.deleteOne({ _id: id })
    }

    close() {
        return disconnect()
    }

}