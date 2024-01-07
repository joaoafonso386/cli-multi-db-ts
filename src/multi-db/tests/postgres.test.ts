import assert from "assert";
import { Context } from './../db/strategies/base/context';
import { Postgres } from './../db/strategies/postgres';
import { describe } from "mocha";

const context = new Context(new Postgres())

describe('Post Strategy', () => {
    it('Postgres connection', async () => {
        const res = await context.isConnected()
        assert.deepEqual(res, true)
    })

}).timeout(Infinity)