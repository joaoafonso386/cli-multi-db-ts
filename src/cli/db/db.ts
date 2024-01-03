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

    async createHero({ id, ...restOfHero }: Hero){
        try {
            const allHeros = await this.getHeros()
            const heroId = id <= 2 ? id : Date.now()
            const newHero: Hero = {
                id: heroId,
                ...restOfHero
            }
            const allNewHeros = [...allHeros, newHero]
            await writeFile(this.HEROS_DATA, JSON.stringify(allNewHeros), {flag: 'r+'})
            return true
        } catch (e) {
            console.log(e);
        }
        
    }

}