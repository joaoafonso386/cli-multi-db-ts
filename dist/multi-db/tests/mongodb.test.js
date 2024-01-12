"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("./../db/strategies/mongodb");
const context_1 = require("./../db/strategies/base/context");
const mocha_1 = require("mocha");
const assert_1 = __importDefault(require("assert"));
const context = new context_1.Context(new mongodb_1.MongoDB());
const HERO_MOCK = {
    name: 'Batman from tests',
    power: 'Night Night'
};
const HERO_MOCK_DEFAULT = {
    name: `Wonder Woman`,
    power: "Light"
};
const HERO_MOCK_UPDATE = {
    name: `Green Lantern From tests`,
    power: "Lantern"
};
let HERO_MOCK_UPDATE_ID;
describe("MongoDB test suite", () => {
    (0, mocha_1.before)(async () => {
        await context.connect();
        await context.create(HERO_MOCK_DEFAULT);
        const { _id } = await context.create(HERO_MOCK_UPDATE);
        HERO_MOCK_UPDATE_ID = _id;
    });
    after(() => context.close());
    it("Test connection", async () => {
        const res = await context.isConnected();
        assert_1.default.deepStrictEqual(res, 1);
    });
    it("Should register a hero", async () => {
        const { name, power } = await context.create(HERO_MOCK);
        assert_1.default.deepStrictEqual({ name, power }, HERO_MOCK);
    });
    it("Should list heroes", async () => {
        const [{ name, power }] = await context.read({ name: HERO_MOCK_DEFAULT.name }, 5);
        assert_1.default.deepStrictEqual({ name, power }, HERO_MOCK_DEFAULT);
    });
    it("Should update a heroe", async () => {
        const { modifiedCount } = await context.update(HERO_MOCK_UPDATE_ID, { name: 'Green Lantern Updated From tests' });
        assert_1.default.deepStrictEqual(modifiedCount, 1);
    });
    it("Should remove a heroe", async () => {
        const { deletedCount } = await context.delete(HERO_MOCK_UPDATE_ID);
        assert_1.default.deepStrictEqual(deletedCount, 1);
    });
});
