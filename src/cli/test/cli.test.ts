import { deepStrictEqual } from "assert";
import { HeroesDB } from "../db/db";
import { Hero } from "../types/types";
import { after, before } from "mocha";


const HERO: Hero = {
    id: 1,
    name: "Flash",
    power: "Speed"
}

const UPDATED_HERO = {
    id: 2,
    name: 'Green Lantern',
    power: 'Ring Energy'
}

const db = new HeroesDB();

describe("Manipulate Heroes", () => {
    before(async () => {
        await db.createHero(HERO)
        await db.createHero(UPDATED_HERO)
    })
    after(async () => {
        await db.removeHero()
    })
    it("should find a hero", async () => {
        const expected = HERO
        const [hero] = await db.getHeros(expected.id)
        deepStrictEqual(hero, expected)
    })
    it("Should register a hero", async () => {
        const expected = HERO
        const [flash] = await db.getHeros(HERO.id)
        deepStrictEqual(flash, expected)
    })
    it("Should remove a hero by id", async () => {
        const expected = true
        const removedHero = await db.removeHero(HERO.id)
        deepStrictEqual(removedHero, expected)
    })
    it("Should update a hero by id", async () => {
        const expected = {
            ...UPDATED_HERO,
            name: 'Batman',
            power: 'Money'
        }
        const newData = {
            name: 'Batman',
            power: 'Money'
        }
        await db.updateHero(UPDATED_HERO.id, newData)
        const [updatedHero] = await db.getHeros(UPDATED_HERO.id)
        deepStrictEqual(updatedHero, expected)
    })
}) 