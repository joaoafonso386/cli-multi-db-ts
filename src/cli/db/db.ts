import { readFile, writeFile } from "fs/promises"
import { Hero, HeroID } from "../types/types"

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
        return this.writeHerosFile(allNewHeros)
    }

    async removeHero(id?: HeroID ) {
        if(!id) {
            return await this.writeHerosFile([])
        }
        const heros = await this.getHeros()
        const heroExists = heros.findIndex((hero) => hero.id === id)
        if(heroExists < 0) {
            throw new Error("Hero does not exist!")
        }
        const newHeroes = heros.filter((hero) => hero.id !== id)
        return await this.writeHerosFile(newHeroes)
    }

    async updateHero(id: HeroID, updated: Pick<Hero, 'name' | 'power'>) {
        const heros = await this.getHeros()
        const heroExists = heros.findIndex((hero) => hero.id === id)
        if(heroExists < 0) {
            throw new Error("Hero does not exist!")
        }
        const updatedHeros = heros.map((hero) => {
            if(hero.id === id) {
                return { ...hero, ...updated }
            }
            return hero
        })
        return await this.writeHerosFile(updatedHeros)
    }

}