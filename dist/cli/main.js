"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const db_1 = require("./db/db");
const main = async () => {
    const cli = new commander_1.Command();
    cli
        .version('v1')
        .option('-n, --name [value]', 'Hero name')
        .option('-p, --power [value]', 'Heros Power')
        .parse(process.argv);
    const { name, power, id } = cli.opts();
    const db = new db_1.HeroesDB();
    try {
        if (!name || !power)
            throw new Error("name '-n' and power '-p' are both required arguments");
        const res = await db.createHero({ name, power, id });
        if (!res) {
            console.error('There was an error registering the Hero');
            return;
        }
        console.log('Hero successfully registered');
    }
    catch (e) {
        console.log(e);
    }
};
main();
