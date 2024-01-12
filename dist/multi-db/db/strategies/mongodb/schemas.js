"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.heroSchema = void 0;
const mongoose_1 = require("mongoose");
exports.heroSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    power: { type: String, required: true },
    insertedAt: { type: String, default: new Date().toLocaleDateString() }
});
