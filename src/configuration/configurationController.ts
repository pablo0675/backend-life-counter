import {Body, Controller, Delete, Get, Param, Post, Query} from '@nestjs/common';
import {ApiBody, ApiTags} from "@nestjs/swagger";

import { ConfigurationService } from './configuration.service';
import {configuration} from "../models/configurationModel";

@ApiTags('config')
@Controller('config')
export class ConfigurationController {
    constructor(private readonly configurationService: ConfigurationService) {}

    @Get('get_configuration')
    async getConfiguration(
        @Query() query:{token: string, configuration_id: string}
    ) : Promise<configuration> {
        return await this.configurationService.getConfiguration(query.token.toString(), query.configuration_id.toString());
    }

    @Get('get_all_configurations')
    async getAllConfigurations(@Query() query:{token: string, user_id: string}
    ) : Promise<configuration[]> {
        return await this.configurationService.getAllConfigurations(query.token.toString(), query.user_id.toString());
    }

    @Delete('delete_configuration')
    async deleteConfiguration( @Query() query:{token: string, configuration_id: string}
    ) : Promise<void> {
        return await this.configurationService.deleteConfiguration(query.token.toString(), query.configuration_id.toString());
    }

    @Post('create_configuration')
    async createConfiguration( @Body () body:{token: string, configuration_id: string, configuration: configuration}
    ) : Promise<configuration> {
        return await this.configurationService.createConfiguration(body.token, body.configuration_id, body.configuration);
    }

    @Post('update_configuration')
    async updateConfiguration( @Body () body:{token: string, configuration_id: string, configuration: configuration}
    ) : Promise<configuration> {
        return await this.configurationService.updateConfiguration(body.token, body.configuration_id, body.configuration);
    }
}
