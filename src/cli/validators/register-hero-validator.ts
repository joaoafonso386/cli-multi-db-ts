import { CliArg } from "cli/types/types"

export const registerHeroValidator = (cliName: CliArg, cliPower: CliArg) => {
    if(!cliName || !cliPower) throw new Error("name '-n' and power '-p' are both required arguments")
    const validName = typeof cliName === 'boolean' ? 'Dummy Hero Name' : cliName
    const validPower = typeof cliPower === 'boolean' ? 'Dummy Hero Power' : cliPower
    return { validName, validPower }
}