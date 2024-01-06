import { Command } from "commander";
import { HeroesDB } from "./db/db";
import { registerHeroValidator } from "./validators/register-hero-validator";

const main = async () => {
   const cli = new Command()
   cli
      .version('v1')
      .option('-l, --list', 'List all heros')
      .option('-r, --register', 'Define that you will be registering a hero')
      .option('-n, --name [value]', 'Hero name')
      .option('-p, --power [value]', 'Heros Power')
      .parse(process.argv)

   const { name, power, id, register, list, remove } = cli.opts()
   const db = new HeroesDB()

   try {
      if(register) {
         const { validName, validPower } = registerHeroValidator(name, power)
         const res = await db.createHero({ name: validName, power: validPower, id })
         if(!res) {
            console.error('There was an error registering the Hero')
            return
         }
         console.log('Hero successfully registered')
      }

      if(list) {
         const heros = await db.getHeros()
         console.log(heros)
         return
      }


   } catch(e) {
      console.log(e)
   }
}  

main()