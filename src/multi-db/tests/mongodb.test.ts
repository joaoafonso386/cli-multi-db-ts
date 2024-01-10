import { MongoDB } from "./../db/strategies/mongodb";
import { Context } from "./../db/strategies/base/context";
import assert from 'assert';

const context = new Context(new MongoDB())

describe("MongoDB test suite", () => {
    it("Test connection", async () => {
        const res = await context.isConnected()

        assert.deepStrictEqual(res, 1)
    })
})