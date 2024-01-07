import { Crud } from "./base/crud";

export class Postgres extends Crud {
    constructor() {
        super()
    }

    create(item: unknown) {
        console.log("item saved in postgres db");
        
    }
}