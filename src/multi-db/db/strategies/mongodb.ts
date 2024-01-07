import { Crud } from "./base/crud";

export class MongoDB extends Crud {
    constructor() {
        super()
    }

    create(item: unknown) {
        console.log("item saved in mongodb db");
        
    }
}