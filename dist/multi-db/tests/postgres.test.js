"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const context_1 = require("./../db/strategies/base/context");
const postgres_1 = require("../db/strategies/postgres/postgres");
const mocha_1 = require("mocha");
const schemas_1 = require("../db/strategies/postgres/schemas");
const HERO = {
    name: 'Arc',
    power: 'Arrow'
};
const HERO_UPDATE = {
    name: 'Batman',
    power: 'Night Shift'
};
let context;
const heroModel = { id: 0, name: "", power: "" };
(0, mocha_1.describe)('Post Strategy', () => {
    (0, mocha_1.before)(async () => {
        const connection = await postgres_1.Postgres.connect();
        const model = await postgres_1.Postgres.defineModel(connection, schemas_1.HeroSchema, heroModel);
        context = new context_1.Context(new postgres_1.Postgres(connection, model, heroModel));
        await context.delete();
        await context.create(HERO_UPDATE);
    });
    it('Postgres connection', async () => {
        const res = await context.isConnected();
        assert_1.default.deepEqual(res, true);
    });
    it('Should register a hero', async () => {
        const { name, power } = await context.create(HERO);
        const valToAssert = {
            name,
            power
        };
        assert_1.default.deepEqual(valToAssert, HERO);
    });
    it('Should list all heros', async () => {
        const [{ name, power }] = await context.read({ name: HERO.name });
        const valToAssert = {
            name,
            power
        };
        assert_1.default.deepEqual(valToAssert, HERO);
    });
    it('Should update a hero', async () => {
        const [heroToUpdate] = await context.read({ name: HERO_UPDATE.name });
        const newHero = {
            ...HERO_UPDATE,
            name: 'Wonder Woman'
        };
        const [affected] = await context.update(heroToUpdate.id ?? 0, newHero);
        const [heroUpdated] = await context.read({ id: heroToUpdate.id ?? 0 });
        assert_1.default.deepEqual(affected, 1);
        assert_1.default.deepEqual(heroUpdated.name, newHero.name);
    });
    it("Should delete a hero by id", async () => {
        const [hero] = await context.read({});
        const res = await context.delete(hero.id);
        assert_1.default.deepEqual(res, 1);
    });
}).timeout(Infinity);
