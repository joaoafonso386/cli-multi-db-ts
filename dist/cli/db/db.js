"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeroesDB = void 0;
const promises_1 = require("fs/promises");
class HeroesDB {
    HEROS_DATA = `${__dirname}/heros.json`;
    async getHeros(searchId) {
        const allHeroes = await this.readHeroesFile();
        const hero = allHeroes.filter(({ id }) => searchId ? id === searchId : true);
        return hero;
    }
    async readHeroesFile() {
        const data = await (0, promises_1.readFile)(this.HEROS_DATA, 'utf8');
        return JSON.parse(data);
    }
    async createHero({ id, ...restOfHero }) {
        try {
            const allHeros = await this.getHeros();
            const heroId = id <= 2 ? id : Date.now();
            const newHero = {
                id: heroId,
                ...restOfHero
            };
            const allNewHeros = [...allHeros, newHero];
            await (0, promises_1.writeFile)(this.HEROS_DATA, JSON.stringify(allNewHeros));
            return true;
        }
        catch (e) {
            console.log(e);
        }
    }
}
exports.HeroesDB = HeroesDB;
