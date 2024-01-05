import { HeroesDB } from "./db/db";

const db = new HeroesDB()

const create = async () => {
   await db.createHero({ id: 1, power: "Speed", name: "Flash"}).then((data) => console.log(data))
   await db.createHero({ id: 6, power: "Night", name: "Batman"}).then((data) => console.log(data))
} 

// create();
// db.removeHero().then((data) => console.log(data))
// db.updateHero(1, { name: "Pau", power: "Gostoso"})