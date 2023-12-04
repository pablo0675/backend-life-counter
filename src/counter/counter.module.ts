import { Module } from '@nestjs/common';
import { CounterService } from './counter.service';
import { CounterController } from './counter.controller';
import {AuthModule} from "../auth/auth.module";
import {MongooseModule} from "@nestjs/mongoose";
import {counterModel, counterSchema} from "../models/counters.model";

@Module({
  imports: [
      MongooseModule.forFeature([{name: 'counter', schema: counterSchema}]),
      counterModel,
  ],
  providers: [CounterService],
  controllers: [CounterController]
})
export class CounterModule {}
