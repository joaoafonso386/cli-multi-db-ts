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
const db = new db_1.HeroesDB();
describe("Manipulate Heroes", () => {
    (0, mocha_1.before)(async () => {
        await db.createHero(HERO);
    });
    it("should find a hero", async () => {
        const expected = HERO;
        const [hero] = await db.getHeros(expected.id);
        (0, assert_1.deepStrictEqual)(hero, expected);
    });
    it("Should register a hero", async () => {
        const expected = HERO;
        const registerHero = await db.createHero(HERO);
        const [flash] = await db.getHeros(HERO.id);
        (0, assert_1.deepStrictEqual)(flash, expected);
    });
});
