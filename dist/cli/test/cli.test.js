"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = require("assert");
const db_1 = require("../db/db");
const mocha_1 = require("mocha");
const HERO = {
    id: 1,
    name: "Flash",
    power: "Speed"
};
const UPDATED_HERO = {
    id: 2,
    name: 'Green Lantern',
    power: 'Ring Energy'
};
const db = new db_1.HeroesDB();
describe("Manipulate Heroes", () => {
    (0, mocha_1.before)(async () => {
        await db.createHero(HERO);
        await db.createHero(UPDATED_HERO);
    });
    (0, mocha_1.after)(async () => {
        await db.removeHero();
    });
    it("should find a hero", async () => {
        const expected = HERO;
        const [hero] = await db.getHeros(expected.id);
        (0, assert_1.deepStrictEqual)(hero, expected);
    });
    it("Should register a hero", async () => {
        const expected = HERO;
        const [flash] = await db.getHeros(HERO.id);
        (0, assert_1.deepStrictEqual)(flash, expected);
    });
    it("Should remove a hero by id", async () => {
        const expected = true;
        const removedHero = await db.removeHero(HERO.id);
        (0, assert_1.deepStrictEqual)(removedHero, expected);
    });
    it("Should update a hero by id", async () => {
        const expected = {
            ...UPDATED_HERO,
            name: 'Batman',
            power: 'Money'
        };
        const newData = {
            name: 'Batman',
            power: 'Money'
        };
        await db.updateHero(UPDATED_HERO.id, newData);
        const [updatedHero] = await db.getHeros(UPDATED_HERO.id);
        (0, assert_1.deepStrictEqual)(updatedHero, expected);
    });
});
