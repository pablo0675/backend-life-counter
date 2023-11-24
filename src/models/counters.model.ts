import {model, Schema} from "mongoose";

export class counter {
    id!: string;
    name!: string;
    logo?: string;
    description?: string;
    baseValue?: number;
    maxValue?: number;
    minValue?: number;
}

export const counterSchema = new Schema<counter>({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    logo: { type: String, required: false },
    description: { type: String, required: false },
    baseValue: { type: Number, required: false },
    maxValue: { type: Number, required: false },
    minValue: { type: Number, required: false },
});

export const counterModel = model<counter>('Counter', counterSchema);

