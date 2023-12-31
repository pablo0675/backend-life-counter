import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import mongoose from "mongoose";
import { ConfigService } from '@nestjs/config';


@Controller()
export class AppController {
  constructor(
      private readonly appService: AppService,
      private readonly configService: ConfigService,
  ) {

  }

  private async connectToDatabase() {
    try {
      const mongoUri = this.configService.get<string>('MONGO_URI');
      if (mongoUri === undefined) {
        throw new Error('MONGO_URI is undefined');
      }
      await mongoose.connect(mongoUri, {
      });
    } catch (error) {
      throw new Error('Error connecting to MongoDB');
    }
  }

  @Get()
  async getHello(): Promise<string> {
    return("hello this is the api of the life-counter  project");
    }
}
