import { deepStrictEqual, ok } from "assert";
import { HeroesDB } from "../db/db";
import { Hero } from "cli/types/types";
import { before } from "mocha";


const HERO: Hero = {
    id: 1,
    name: "Flash",
    power: "Speed"
}

const db = new HeroesDB();

describe("Manipulate Heroes", () => {
    before(async () => {
        await db.createHero(HERO)
    })
    it("should find a hero", async () => {
        const expected = HERO
        const [hero] = await db.getHeros(expected.id)
        deepStrictEqual(hero, expected)
    })
    it("Should register a hero", async () => {
        const expected = HERO
        const registerHero = await db.createHero(HERO)
        const [flash] = await db.getHeros(HERO.id)
        deepStrictEqual(flash, expected)
    })
}) 