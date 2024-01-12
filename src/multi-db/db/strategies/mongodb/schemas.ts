import { Schema } from "mongoose";
import { Hero } from "multi-db/db/types/mongo.types";

export const heroSchema = new Schema<Hero>({
    name: { type: String, required: true },
    power: { type: String, required: true },
    insertedAt: { type: String, default: new Date().toLocaleDateString() }
});