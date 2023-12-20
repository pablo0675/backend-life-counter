import { Injectable } from '@nestjs/common';
import {configuration} from "../models/configurationModel";
import {Model} from "mongoose";
import {InjectModel} from "@nestjs/mongoose";
import {AuthService} from "../auth/auth.service";

@Injectable()
export class ConfigurationService {

    constructor(
        @InjectModel('config') private readonly configurationModel: Model<configuration>,
        private readonly authService: AuthService,
    ) {
    }

    async getConfiguration( token: string, configuration_id: string) : Promise<configuration>
    {
        const configuration = await this.configurationModel.findOne({configuration_id: configuration_id}).exec();
        if (!configuration) {
            throw new Error('Configuration not found');
        }
        if (!await this.authService.verifyToken(token)) {
            throw new Error('Invalid token');
        }
        return configuration;
    }

    async getAllConfigurations( token: string, user_id: string) : Promise<configuration[]>
    {
        if (!await this.authService.verifyToken(token)) {
            throw new Error('Invalid token');
        }
        return await this.configurationModel.find({user_id: user_id}).exec();
    }

    async deleteConfiguration( token: string, configuration_id: string) : Promise<void>
    {
        const configuration = await this.configurationModel.findOne({configuration_id: configuration_id}).exec();
        if (!configuration) {
            throw new Error('Configuration not found');
        }
        if (!await this.authService.verifyToken(token)) {
        }
        await this.configurationModel.deleteOne({configuration_id: configuration_id}).exec();
    }

    async createConfiguration( token: string, configuration_id: string, configuration: configuration) : Promise<configuration>
    {
        if (!await this.authService.verifyToken(token)) {
            throw new Error('Invalid token');
        }
        configuration.id = configuration_id;
        console.log(configuration.user_id);
        const newConfiguration = new this.configurationModel(configuration);
        return await newConfiguration.save();
    }

    async updateConfiguration( token: string, configuration_id: string, configuration: configuration) : Promise<configuration>
    {
        if (!await this.authService.verifyToken(token)) {
            throw new Error('Invalid token');
        }
        return await this.configurationModel.findOneAndUpdate({configuration_id: configuration_id}, configuration, {new: true}).exec();
    }
}
