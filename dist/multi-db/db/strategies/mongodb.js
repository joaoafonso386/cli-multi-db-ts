"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoDB = void 0;
const crud_1 = require("./base/crud");
class MongoDB extends crud_1.Crud {
    constructor() {
        super();
    }
    create(item) {
        console.log("item saved in mongodb db");
    }
}
exports.MongoDB = MongoDB;
