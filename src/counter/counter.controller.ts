import {Body, Controller, Delete, Get, Param, Post} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";
import {CounterService} from "./counter.service";
import {counter} from "../models/counters.model";

@ApiTags('counter')
@Controller('counter')
export class CounterController {
    constructor(
        private readonly counterService: CounterService,
    ) {}

    @Get('get_counter')
    async getCounter(
        @Param() counter_id: string,
    ) : Promise<counter> {
        return await this.counterService.getCounter(counter_id);
    }

    @Get('get_all_counters')
    async getAllCounters(
        @Param() user_id: string,
    ) : Promise<counter[]> {
        return await this.counterService.getAllCounters(user_id);
    }

    @Delete('delete_counter')
    async deleteCounter(
        @Param() counter_id: string,
    ) : Promise<void> {
        return await this.counterService.deleteCounter(counter_id);
    }

    @Post('create_counter')
    async createCounter(
        @Body() counter_id: string,
        @Body() counter: counter,
        @Body() user_id: string,
    ) : Promise<counter> {
        return await this.counterService.createCounter(counter_id, counter, user_id);
    }

    @Post('update_counter')
    async updateCounter(
        @Body() counter_id: string,
        @Body() counter: counter,
    ) : Promise<counter> {
        return await this.counterService.updateCounter(counter_id, counter);
    }

    @Post('create_counter_admin')
    async createCounterAdmin(
        @Body() counter_id: string,
        @Body() counter: counter,
    ) : Promise<counter> {
        return await this.counterService.createCounterAdmin(counter_id, counter);
    }
}
