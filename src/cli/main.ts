import { HeroesDB } from "./db/db";

const db = new HeroesDB()

const create = async () => {
   await db.createHero({ id: 6, power: "Speed", name: "Batman"}).then((data) => console.log(data))
   await db.createHero({ id: 1, power: "Speed", name: "Flash"}).then((data) => console.log(data))
} 

// create();
// db.removeHero(1).then((data) => console.log(data))