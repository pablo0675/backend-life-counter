import {Body, Controller, Delete, Get, Param, Post, Query} from '@nestjs/common';
import {ApiBody, ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {CounterService} from "./counter.service";
import {counter} from "../models/counters.model";

@ApiTags('counter')
@Controller('counter')
export class CounterController {
    constructor(
        private readonly counterService: CounterService,
    ) {}

    @ApiOkResponse({
        description: 'success',
        type: counter,
    })

    @ApiBody({description: 'counter_id', type: String})

    @Get('get_counter')
    async getCounter(
        @Query() counter_id: string,
    ) : Promise<counter> {
        return await this.counterService.getCounter(counter_id);
    }

    @ApiOkResponse({
        description: 'success',
        type: counter,
    })

    @ApiBody({description: 'user_id', type: String})
    @Get('get_all_counters')
    async getAllCounters(
        @Query() user_id: string,
    ) : Promise<counter[]> {
        console.log(user_id);
        return await this.counterService.getAllCounters(user_id);
    }


    @ApiOkResponse({
        description: 'success',
        type: String,
    })

    @ApiBody({description: 'Counter_id', type: String})

    @Delete('delete_counter')
    async deleteCounter(
        @Query() counter_id: string,
    ) : Promise<void> {
        return await this.counterService.deleteCounter(counter_id);
    }


    @ApiOkResponse({
        description: 'success',
        type: counter,
    })

    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                counter: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'string',
                        },
                        name: {
                            type: 'string',
                        },
                        logo: {
                            type: 'string',
                        },
                        description: {
                            type: 'string',
                        },
                        baseValue: {
                            type: 'number',
                        },
                        maxValue: {
                            type: 'number',
                        },
                        minValue: {
                            type: 'number',
                        },
                        user_id: {
                            type: 'string',
                        },
                    },
                },
                user_id: {
                    type: 'string',
                },
            },
        }
    })

    @Post('create_counter')
    async createCounter(
        @Body() counter: counter,
        @Body() user_id: string,
    ) : Promise<counter> {
        return await this.counterService.createCounter(counter, user_id);
    }

    @ApiOkResponse({
        description: 'success',
        type: counter,
    })

    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                counter_id: {
                    type: 'string',
                },
                counter: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'string',
                        },
                        name: {
                            type: 'string',
                        },
                        logo: {
                            type: 'string',
                        },
                        description: {
                            type: 'string',
                        },
                        baseValue: {
                            type: 'number',
                        },
                        maxValue: {
                            type: 'number',
                        },
                        minValue: {
                            type: 'number',
                        },
                        user_id: {
                            type: 'string',
                        },
                    },
                },
            },
        }
    })

    @Post('update_counter')
    async updateCounter(
        @Body() counter_id: string,
        @Body() counter: counter,
    ) : Promise<counter> {
        return await this.counterService.updateCounter(counter_id, counter);
    }

    @ApiOkResponse({
        description: 'success',
        type: counter,
    })

    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                counter_id: {
                    type: 'string',
                },
                counter: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'string',
                        },
                        name: {
                            type: 'string',
                        },
                        logo: {
                            type: 'string',
                        },
                        description: {
                            type: 'string',
                        },
                        baseValue: {
                            type: 'number',
                        },
                        maxValue: {
                            type: 'number',
                        },
                        minValue: {
                            type: 'number',
                        },
                        user_id: {
                            type: 'string',
                        },
                    },
                },
            },
        }
    })

    @Post('create_counter_admin')
    async createCounterAdmin(
        @Body() counter_id: string,
        @Body() counter: counter,
    ) : Promise<counter> {
        return await this.counterService.createCounterAdmin(counter_id, counter);
    }
}
