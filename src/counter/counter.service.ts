import {Injectable} from '@nestjs/common';
import {ICounter} from "../models/counters.model";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {v4 as uuidv4} from 'uuid';
import { CounterModel} from "../models/counters.model";


@Injectable()
export class CounterService {

    constructor(
        @InjectModel('Counter') private readonly CounterModel: Model<ICounter>,
    ) {
    }

    async getCounter( counter_id: string) : Promise<ICounter>
    {
        const counter = await this.CounterModel.findOne({counter_id: counter_id.toString()}).exec();
        if (!counter) {
            throw new Error('Counter not found');
        }
        return counter;
    }

    async getAllCounters( user_id: string) : Promise<ICounter[]>
    {
        return await this.CounterModel.find({$or: [{user_id: user_id.toString()}, {user_id: "admin"}]}).exec();
    }

    async deleteCounter( counter_id: string) : Promise<void>
    {
        const counter = await this.CounterModel.findOne({counter_id: counter_id.toString()}).exec();
        if (!counter) {
            throw new Error('Counter not found');
        }
        await this.CounterModel.deleteOne({counter_id: counter_id.toString()}).exec();
    }

    async createCounter(counterData: ICounter) : Promise<void>
    {
        const newCounter = new this.CounterModel({
            counter_id: uuidv4(),
            user_id: counterData.user_id,
            counter_name: counterData.counter_name,
            baseValue: counterData.baseValue,
            maxValue: counterData.maxValue,
            logo: counterData.logo,
            minValue: counterData.minValue,
            description: counterData.description,
        });
        await newCounter.save();
    }

    async updateCounter( counter_id: string, counter: ICounter) : Promise<ICounter>
    {
        let oldCounter = await this.CounterModel.findOne({counter_id: counter_id}).exec();
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

    async createCounterAdmin( counterData: ICounter) : Promise<void>
    {
        const newCounter = new this.CounterModel({
            counter_id: uuidv4(),
            user_id: "admin",
            counter_name: counterData.counter_name,
            baseValue: counterData.baseValue,
            maxValue: counterData.maxValue,
            logo: counterData.logo,
            minValue: counterData.minValue,
            description: counterData.description,
        });
        await newCounter.save();
    }
}
