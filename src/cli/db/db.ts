import { readFile } from "fs/promises"

export class HeroesDB {
    private HEROS_DATA = 'heros.json' 
    list(name: string) {
        // const heroName = await He
        
    }

    async readFile(){
        const data = await readFile(`${__dirname}/${this.HEROS_DATA}`, 'utf8');
        return JSON.parse(data)
    }

    writeFile(){
        return null
    }

}