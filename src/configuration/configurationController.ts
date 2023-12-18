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
        @Query() token: string,
        @Query() configuration_id: string,
    ) : Promise<configuration> {
        return await this.configurationService.getConfiguration(token.toString(), configuration_id.toString());
    }

    @Get('get_all_configurations')
    async getAllConfigurations(
        @Query() token: string,
        @Query() user_id: string,
    ) : Promise<configuration[]> {
        return await this.configurationService.getAllConfigurations(token.toString(), user_id.toString());
    }

    @Delete('delete_configuration')
    async deleteConfiguration(
        @Query() token: string,
        @Query() configuration_id: string,
    ) : Promise<void> {
        return await this.configurationService.deleteConfiguration(token.toString(), configuration_id.toString());
    }

    @Post('create_configuration')
    async createConfiguration(
        @Body() token: string,
        @Body() configuration_id: string,
        @Body() configuration: configuration,
    ) : Promise<configuration> {
        return await this.configurationService.createConfiguration(token, configuration_id, configuration);
    }

    @Post('update_configuration')
    async updateConfiguration(
        @Body() token: string,
        @Body() configuration_id: string,
        @Body() configuration: configuration,
    ) : Promise<configuration> {
        return await this.configurationService.updateConfiguration(token, configuration_id, configuration);
    }
}
