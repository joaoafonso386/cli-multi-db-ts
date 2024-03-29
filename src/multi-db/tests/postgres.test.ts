import assert from "assert";
import { Context } from './../db/strategies/base/context';
import { Postgres } from '../db/strategies/postgres/postgres';
import { before, describe } from "mocha";
import { Hero, HeroModel } from "../db/types/postgres.types";
import { HeroSchema } from "../db/strategies/postgres/schemas";
const HERO = {
    name: 'Arc',
    power: 'Arrow'
}
const HERO_UPDATE = {
    name: 'Batman',
    power: 'Night Shift'
}

let context: Context;

const heroModel = { id: 0, name: "", power: ""} as HeroModel

describe('Post Strategy', () => {

    before(async () => {
        const connection = await Postgres.connect()
        const model = await Postgres.defineModel(connection, HeroSchema, heroModel)
        context = new Context(new Postgres(connection, model))
        await context.delete()
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
        const [{ name, power }] = await context.read({ name: HERO.name }) as Hero[]
        const valToAssert = {
            name,
            power
        } 
        assert.deepEqual(valToAssert, HERO)
    })
    it('Should update a hero', async () => {
        const [heroToUpdate] = await context.read({ name: HERO_UPDATE.name }) as Hero[]
        const newHero = {
            ...HERO_UPDATE,
            name: 'Wonder Woman'
        }
        const [affected] = await context.update(heroToUpdate.id ?? 0, newHero) as number[]
        const [heroUpdated] = await context.read({ id: heroToUpdate.id ?? 0}) as Hero[]
        assert.deepEqual(affected, 1)
        assert.deepEqual(heroUpdated.name, newHero.name)
    })
    it("Should delete a hero by id", async () => {
        const [hero] = await context.read({} as Hero) 
        const res = await context.delete(hero.id)
        assert.deepEqual(res, 1)
    })

}).timeout(Infinity)