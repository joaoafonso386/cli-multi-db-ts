export type Hero = {
    id: number,
    name: string,
    power: string
}

export type HeroID = Hero['id']

export type CliArg = string | boolean | undefined