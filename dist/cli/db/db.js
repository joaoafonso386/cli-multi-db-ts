"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeroesDB = void 0;
const promises_1 = require("fs/promises");
class HeroesDB {
    HEROS_DATA = 'heros.json';
    list(name) {
        // const heroName = await He
    }
    async readFile() {
        const data = await (0, promises_1.readFile)(`${__dirname}/${this.HEROS_DATA}`, 'utf8');
        return JSON.parse(data);
    }
    writeFile() {
        return null;
    }
}
exports.HeroesDB = HeroesDB;
