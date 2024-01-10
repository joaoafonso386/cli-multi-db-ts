import { Schema } from "mongoose";

// 1. Create an interface representing a document in MongoDB.
export type Hero = {
    name: string;
    power: string;
    insertedAt: string;
  }
  
export const heroSchema = new Schema<Hero>({
    name: { type: String, required: true },
    power: { type: String, required: true },
    insertedAt: { type: String, default: new Date().toLocaleDateString() }
});