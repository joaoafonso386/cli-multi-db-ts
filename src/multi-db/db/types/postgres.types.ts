import { InferAttributes, InferCreationAttributes, Model } from "sequelize";

export interface HeroModel extends Model<InferAttributes<HeroModel>, InferCreationAttributes<HeroModel>> {
    id: number;
    name: string;
    power?: string;
}

export type Hero = Pick<HeroModel, 'name' | 'power'> & { id?: number }

