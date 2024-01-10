import { MongoDB } from "./../db/strategies/mongodb";
import { Context } from "./../db/strategies/base/context";
import assert from 'assert';
import { Hero } from "cli/types/types";

const context = new Context(new MongoDB())

const HERO_MOCK = {
    name: 'Batman from tests',
    power: 'Night Night'
}

describe("MongoDB test suite", () => {
    it("Test connection", async () => {
        const res = await context.isConnected()

        assert.deepStrictEqual(res, 1)
    })

    it("Should register a hero", async () => {
        const { name , power } = await context.create(HERO_MOCK)
        assert.deepStrictEqual({ name, power }, HERO_MOCK)
    })
})