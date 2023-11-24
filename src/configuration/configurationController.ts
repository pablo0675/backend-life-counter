import {Controller, Delete, Get, Param, Post} from '@nestjs/common';
import {ApiBody, ApiTags} from "@nestjs/swagger";

import { ConfigurationService } from './configuration.service';
import {configuration} from "../models/configurationModel";

@ApiTags('config')
@Controller('config')
export class ConfigurationController {
    constructor(private readonly configurationService: ConfigurationService) {}

    @ApiBody({description: 'Get configuration', type: configuration})
    @Get('get_configuration')
    async getConfiguration(
        @Param() token: string,
        @Param() configuration_id: string,
    ) : Promise<configuration> {
        return await this.configurationService.getConfiguration(token, configuration_id);
    }

    @Get('get_all_configurations')
    async getAllConfigurations(
        @Param() token: string,
        @Param() user_id: string,
    ) : Promise<configuration[]> {
        return await this.configurationService.getAllConfigurations(token, user_id);
    }

    @Delete('delete_configuration')
    async deleteConfiguration(
        @Param() token: string,
        @Param() configuration_id: string,
    ) : Promise<void> {
        return await this.configurationService.deleteConfiguration(token, configuration_id);
    }

    @Post('create_configuration')
    async createConfiguration(
        @Param() token: string,
        @Param() configuration_id: string,
        @Param() configuration: configuration,
    ) : Promise<configuration> {
        return await this.configurationService.createConfiguration(token, configuration_id, configuration);
    }

    @Post('update_configuration')
    async updateConfiguration(
        @Param() token: string,
        @Param() configuration_id: string,
        @Param() configuration: configuration,
    ) : Promise<configuration> {
        return await this.configurationService.updateConfiguration(token, configuration_id, configuration);
    }
}
