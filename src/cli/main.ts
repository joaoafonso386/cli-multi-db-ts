import { Command } from "commander";
import { HeroesDB } from "./db/db";
import { registerHeroValidator } from "./validators/register-hero-validator";

const main = async () => {
   const cli = new Command()
   cli
      .version('v1')
      .option('-l, --list', 'List all heros')
      .option('-r, --register', 'Define that you will be registering a hero')
      .option('-rm, --remove [value]', 'Delete a hero by id')
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
         return
      }

      if(list) {
         const heros = await db.getHeros()
         console.log(heros)
         return
      }

      if(remove) {
         const id = parseInt(remove)
         const deletedHero = await db.removeHero(id)
         console.log(`It is ${deletedHero} that your hero has been removed!`)
         return
      }

      console.log(cli.opts())


   } catch(e) {
      console.log(e)
   }
}  

main()