import assert from "assert";
import { Context } from './../db/strategies/base/context';
import { Postgres } from './../db/strategies/postgres';
import { before, describe } from "mocha";

const context = new Context(new Postgres())
const HERO = {
    name: 'Arc',
    power: 'Arrow'
}
const HERO_UPDATE = {
    name: 'Batman',
    power: 'Night Shift'
}

describe('Post Strategy', () => {

    before(async () => {
        await context.connect()
        await context.create(HERO_UPDATE)
    })

    it('Postgres connection', async () => {
        const res = await context.isConnected()
        assert.deepEqual(res, true)
    })
    it('Should register a hero', async () => {
        const { name, power } = await context.create(HERO)
        const valToAssert = {
            name,
            power
        }
        assert.deepEqual(valToAssert, HERO)
    })
    it('Should list all heros', async () => {
        const [{ name, power }] = await context.read({ name: HERO.name })
        const valToAssert = {
            name,
            power
        } 
        assert.deepEqual(valToAssert, HERO)
    })
    it('Should update a hero', async () => {
        const [heroToUpdate] = await context.read({ name: HERO_UPDATE.name })
        const newHero = {
            ...HERO_UPDATE,
            name: 'Wonder Woman'
        }
        const [affected] = await context.update(heroToUpdate.id, newHero)
        const [heroUpdated] = await context.read({ id: heroToUpdate.id })
        assert.deepEqual(affected, 1)
        assert.deepEqual(heroUpdated.name, newHero.name)
    })

}).timeout(Infinity)