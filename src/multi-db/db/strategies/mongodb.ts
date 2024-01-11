import { Hero, heroSchema } from "../types/mongo.types";
import { HeroReadOptions } from "../types/types";
import { Crud } from "./base/crud";
import { connect, model } from "mongoose";
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

    read(item: HeroReadOptions, limit = 10) {
        return this.model.find(item, undefined).limit(limit)
    }

}