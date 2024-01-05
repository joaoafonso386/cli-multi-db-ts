"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
async function main() {
    const cli = new commander_1.Command();
    cli.version('v1').parse(process.argv);
}
main();
