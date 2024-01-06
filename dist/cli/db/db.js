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
        const data = await (0, promises_1.readFile)(this.HEROS_DATA, "utf8");
        return JSON.parse(data);
    }
    async writeHerosFile(herosArr) {
        await (0, promises_1.writeFile)(this.HEROS_DATA, JSON.stringify(herosArr));
        return true;
    }
    async createHero({ id, ...restOfHero }) {
        const allHeros = await this.getHeros();
        const heroId = id <= 2 ? id : Date.now();
        const newHero = {
            id: heroId,
            ...restOfHero,
        };
        const allNewHeros = [...allHeros, newHero];
        return this.writeHerosFile(allNewHeros);
    }
    async removeHero(id) {
        if (!id) {
            return await this.writeHerosFile([]);
        }
        const heros = await this.getHeros();
        const heroExists = heros.findIndex((hero) => hero.id === id);
        if (heroExists < 0) {
            throw new Error("Hero does not exist!");
        }
        const newHeroes = heros.filter((hero) => hero.id !== id);
        return await this.writeHerosFile(newHeroes);
    }
    async updateHero(id, updated) {
        const heros = await this.getHeros();
        const heroExists = heros.findIndex((hero) => hero.id === id);
        if (heroExists < 0) {
            throw new Error("Hero does not exist!");
        }
        const updatedHeros = heros.map((hero) => {
            if (hero.id === id) {
                return { ...hero, ...updated };
            }
            return hero;
        });
        return await this.writeHerosFile(updatedHeros);
    }
}
exports.HeroesDB = HeroesDB;
