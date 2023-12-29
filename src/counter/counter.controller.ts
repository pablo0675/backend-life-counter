import {Body, Controller, Delete, Get, Param, Post, Query} from '@nestjs/common';
import {ApiBody, ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {CounterService} from "./counter.service";
import {ICounter, counterDto} from "../models/counters.model";

@ApiTags('counter')
@Controller('counter')
export class CounterController {
    constructor(
        private readonly counterService: CounterService,
    ) {}

    @ApiOkResponse({
        description: 'success',
        type: counterDto,
    })

    @ApiBody({description: 'counter_id', type: String})

    @Get('get_counter')
    async getCounter(
        @Query() counter_id: string,
    ) : Promise<ICounter> {
        return await this.counterService.getCounter(counter_id);
    }

    @ApiOkResponse({
        description: 'success',
        type: counterDto,
    })

    @ApiBody({description: 'user_id', type: String})
    @Get('get_all_counters')
    async getAllCounters(
        @Query() user_id: string,
    ) : Promise<ICounter[]> {
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
        type: counterDto,
    })

    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                counter: {
                    type: 'object',
                    properties: {
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
                    },
                },
                user_id: {
                    type: 'string',
                }
            }
        }
    })

    @Post('create_counter')
    async createCounter(@Body() body: { counter: ICounter, user_id: string }) : Promise<void> {
        body.counter.user_id = body.user_id.toString();
        return await this.counterService.createCounter(body.counter);
    }

    @ApiOkResponse({
        description: 'success',
        type: counterDto,
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
    async updateCounter(@Body() body:{counter_id: string, counter: ICounter}
    )
        : Promise<ICounter> {
        console.log(body.counter_id, body.counter.counter_name);
        return await this.counterService.updateCounter(body.counter_id, body.counter);
    }

    @ApiOkResponse({
        description: 'success',
        type: counterDto,
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
        @Body() Counter: ICounter,
    ) : Promise<void> {
        return await this.counterService.createCounterAdmin(Counter);
    }
}
