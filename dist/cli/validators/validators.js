"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nameAndPowerValidator = void 0;
const nameAndPowerValidator = (cliName, cliPower) => {
    if (!cliName || !cliPower)
        throw new Error("name '-n' and power '-p' are both required arguments");
    const validName = typeof cliName === 'boolean' ? 'Dummy Hero Name' : cliName;
    const validPower = typeof cliPower === 'boolean' ? 'Dummy Hero Power' : cliPower;
    return { validName, validPower };
};
exports.nameAndPowerValidator = nameAndPowerValidator;
