import { Module } from '@nestjs/common';
import { CounterService } from './counter.service';
import { CounterController } from './counter.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {CounterModel, CounterSchema} from "../models/counters.model";

@Module({
  imports: [
      MongooseModule.forFeature([{name: 'Counter', schema: CounterSchema}]),
      CounterModel,
  ],
  providers: [CounterService],
  controllers: [CounterController]
})
export class CounterModule {}
