import assert from "assert";
import { Context } from './../db/strategies/base/context';
import { Postgres } from './../db/strategies/postgres';
import { before, describe } from "mocha";

const context = new Context(new Postgres())
const HERO = {
    name: 'Arc',
    power: 'Arrow'
}

describe('Post Strategy', () => {

    before(async () => {
        await context.connect()
    })

    it('Postgres connection', async () => {
        const res = await context.isConnected()
        assert.deepEqual(res, true)
    })
    it('Should Register a hero', async () => {
        const { name, power } = await context.create(HERO)
        const valToAssert = {
            name,
            power
        }
        assert.deepEqual(valToAssert, HERO)
    })

}).timeout(Infinity)