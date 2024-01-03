import { readFile, writeFile } from "fs/promises"
import { Hero } from "../types/types"

export class HeroesDB {
    private HEROS_DATA = `${__dirname}/heros.json`;

    async getHeros(searchId?: number) {
        const allHeroes = await this.readHeroesFile();
        const hero = allHeroes.filter(({ id }) => searchId ? id === searchId : true)
        return hero
    }

    async readHeroesFile(): Promise<Hero[]> {
        try {
            const data = await readFile(this.HEROS_DATA, 'utf8');
            return JSON.parse(data)
        } catch (e) {
            console.log(e)
            return []
        }
    }

    async writeHerosFile(herosArr: Hero[]) {
        try {
            await writeFile(this.HEROS_DATA, JSON.stringify(herosArr))
            return true
        } catch (e) {
            console.log(e)
        }
    }

    async createHero({ id, ...restOfHero }: Hero){
        const allHeros = await this.getHeros()
        const heroId = id <= 2 ? id : Date.now()
        const newHero: Hero = {
            id: heroId,
            ...restOfHero
        }
        const allNewHeros = [...allHeros, newHero]
        this.writeHerosFile(allNewHeros)
        return true
    }

    async removeHero(id?: Hero["id"]) {
        if(!id) {
            return await this.writeHerosFile([])
        }
        const allHeros = await this.getHeros()
        const newHeroes = allHeros.filter((hero) => hero.id !== id)
        return await this.writeHerosFile(newHeroes)
    }

}