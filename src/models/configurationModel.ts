import {model, Schema} from "mongoose";
import {ICounter} from "./counters.model";

class color {
    r: number;
    g: number;
    b: number;
}

class player {
    id!: string;
    name!: string;
    color?: color;
    picture?: string;
}

export interface configuration {
    id: string;
    name: string;
    user_id: string;
    players: player[];
    counters: ICounter[];
}

export const configurationSchema = new Schema<configuration>({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    user_id: { type: String, required: true },
    players: {
        type: [{
            id: { type: String, required: true },
            name: { type: String, required: true },
            color: {
                r: { type: Number, required: false },
                g: { type: Number, required: false },
                b: { type: Number, required: false },
            },
            picture: { type: String, required: false },
        }],
        required: false
    },
    counters: {
        type: [{
            counter_id: { type: String, required: true },
            counter_name: { type: String, required: true },
            logo: { type: String, required: false },
            description: { type: String, required: false },
            baseValue: { type: Number, required: false },
            maxValue: { type: Number, required: false },
            minValue: { type: Number, required: false },
        }],
        required: false
    },
});

export const configurationModel = model<configuration>('Config', configurationSchema);