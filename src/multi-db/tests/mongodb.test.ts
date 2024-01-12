import assert from 'assert';
import { MongoDB } from "../db/strategies/mongodb/mongodb";
import { Context } from "./../db/strategies/base/context";
import { heroSchema } from "../db/strategies/mongodb/schemas";
import { before } from "mocha";

const context = new Context(new MongoDB("mongodb://zigoto:zigoto@127.0.0.1:27017/heroes", heroSchema, "Heroes"))

const HERO_MOCK = {
    name: 'Batman from tests',
    power: 'Night Night'
}

const HERO_MOCK_DEFAULT = {
    name: `Wonder Woman`,
    power: "Light"
}

const HERO_MOCK_UPDATE = {
    name: `Green Lantern From tests`,
    power: "Lantern"
}

let HERO_MOCK_UPDATE_ID: string;

describe("MongoDB test suite", () => {
    before(async () => {
        await context.connect()
        await context.create(HERO_MOCK_DEFAULT)
        const { _id } = await context.create(HERO_MOCK_UPDATE)
        HERO_MOCK_UPDATE_ID = _id
    })

    after(() => context.close())

    it("Test connection", async () => {
        const res = await context.isConnected()

        assert.deepStrictEqual(res, 1)
    })

    it("Should register a hero", async () => {
        const { name , power } = await context.create(HERO_MOCK)
        assert.deepStrictEqual({ name, power }, HERO_MOCK)
    })

    it("Should list heroes", async () => {
        const [{ name, power }] = await context.read({ name: HERO_MOCK_DEFAULT.name }, 5)
        assert.deepStrictEqual({ name, power }, HERO_MOCK_DEFAULT)
    })
    it("Should update a heroe", async () => {
        const { modifiedCount }: any = await context.update(HERO_MOCK_UPDATE_ID, { name: 'Green Lantern Updated From tests'})

        assert.deepStrictEqual(modifiedCount, 1)
    })
    it("Should remove a heroe", async () => {
        const { deletedCount }: any = await context.delete(HERO_MOCK_UPDATE_ID)
        assert.deepStrictEqual(deletedCount, 1)
    })
})