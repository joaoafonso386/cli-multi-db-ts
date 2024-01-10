"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("./db/strategies/mongodb");
console.log(new mongodb_1.MongoDB().isConnected());
