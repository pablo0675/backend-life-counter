import mongoose, {model, Schema} from "mongoose";

export interface ICounter {
    counter_id: string;
    counter_name: string;
    logo: string;
    description: string;
    baseValue: number;
    maxValue: number | null;
    minValue: number | null;
    user_id: string;
}

export class counterDto {
    counter_id: string;
    counter_name: string;
    logo: string;
    description: string;
    baseValue: number;
    maxValue: number | null;
    minValue: number | null;
    user_id: string | "admin";
}

export const CounterSchema = new Schema<ICounter>({
    counter_id: { type: String, required: true, unique: true },
    counter_name: { type: String, required: true },
    logo: { type: String, required: false },
    description: { type: String, required: false },
    baseValue: { type: Number, required: true },
    maxValue: { type: Number, required: false },
    minValue: { type: Number, required: false },
    user_id: { type: String, required: true },
});

export const CounterModel = model<ICounter>('Counter', CounterSchema);

