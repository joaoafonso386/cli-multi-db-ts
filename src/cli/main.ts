import { Command } from "commander";
import { HeroesDB } from "./db/db";

const main = async () => {
   const cli = new Command()
   cli
      .version('v1')
      .option('-n, --name [value]', 'Hero name')
      .option('-p, --power [value]', 'Heros Power')
      .parse(process.argv)

   const { name, power, id } = cli.opts()
   const db = new HeroesDB()

   try {
      if(!name || !power) throw new Error("name '-n' and power '-p' are both required arguments")
      const res = await db.createHero({ name, power, id })
      if(!res) {
         console.error('There was an error registering the Hero')
         return
      }
      console.log('Hero successfully registered')
   } catch(e) {
      console.log(e)
   }
}  

main()