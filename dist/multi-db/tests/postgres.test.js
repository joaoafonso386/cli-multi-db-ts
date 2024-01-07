"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const context_1 = require("./../db/strategies/base/context");
const postgres_1 = require("./../db/strategies/postgres");
const mocha_1 = require("mocha");
const context = new context_1.Context(new postgres_1.Postgres());
(0, mocha_1.describe)('Post Strategy', () => {
    it('Postgres connection', async () => {
        const res = await context.isConnected();
        assert_1.default.deepEqual(res, true);
    });
}).timeout(Infinity);
