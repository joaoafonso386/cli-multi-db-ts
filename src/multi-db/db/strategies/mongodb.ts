import { Hero, heroSchema } from "../types/mongo.types";
import { Crud } from "./base/crud";
import { connect, model } from "mongoose";
export class MongoDB extends Crud {
    private heroes: any;
 
    create(item: unknown) {
        console.log("item saved in mongodb db");
        
    }

    async isConnected() {
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

    model() {
        this.heroes = model<Hero>('Heroes', heroSchema)
    }
}