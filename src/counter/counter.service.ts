import { Injectable } from '@nestjs/common';
import {counter} from "../models/counters.model";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";

@Injectable()
export class CounterService {

    constructor(
        @InjectModel('counter') private readonly counterModel: Model<counter>,
    ) {
    }

    async getCounter( counter_id: string) : Promise<counter>
    {
        const counter = await this.counterModel.findOne({counter_id: counter_id}).exec();
        if (!counter) {
            throw new Error('Counter not found');
        }
        return counter;
    }

    async getAllCounters( user_id: string) : Promise<counter[]>
    {
        return await this.counterModel.find({$or: [{user_id: user_id}, {user_id: "admin"}]}).exec();
    }

    async deleteCounter( counter_id: string) : Promise<void>
    {
        const counter = await this.counterModel.findOne({counter_id: counter_id}).exec();
        if (!counter) {
            throw new Error('Counter not found');
        }
        await this.counterModel.deleteOne({counter_id: counter_id}).exec();
    }

    async createCounter( counter_id: string, counter: counter, user_id: string) : Promise<counter>
    {
        const newCounter = new this.counterModel(counter);
        newCounter.user_id = user_id;
        return await newCounter.save();
    }

    async updateCounter( counter_id: string, counter: counter) : Promise<counter>
    {
        let oldCounter = await this.counterModel.findOne({counter_id: counter_id}).exec();
        if (!oldCounter) {
            throw new Error('Counter not found');
        }
        for (const key in counter) {
            if (counter.hasOwnProperty(key)) {
                oldCounter[key] = counter[key];
            }
        }
        return await oldCounter.save();
    }

    async createCounterAdmin( counter_id: string, counter: counter) : Promise<counter>
    {
        const newCounter = new this.counterModel(counter);
        newCounter.user_id = "admin";
        return await newCounter.save();
    }
}
