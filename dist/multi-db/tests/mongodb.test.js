"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("./../db/strategies/mongodb");
const context_1 = require("./../db/strategies/base/context");
const assert_1 = __importDefault(require("assert"));
const context = new context_1.Context(new mongodb_1.MongoDB());
const HERO_MOCK = {
    name: 'Batman from tests',
    power: 'Night Night'
};
describe("MongoDB test suite", () => {
    it("Test connection", async () => {
        const res = await context.isConnected();
        assert_1.default.deepStrictEqual(res, 1);
    });
    it("Should register a hero", async () => {
        const { name, power } = await context.create(HERO_MOCK);
        assert_1.default.deepStrictEqual({ name, power }, HERO_MOCK);
    });
});
