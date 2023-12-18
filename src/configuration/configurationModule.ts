import { Module } from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import {configurationModel, configurationSchema} from "../models/configurationModel";
import {ConfigurationController} from "./configurationController";
import {ConfigurationService} from "./configuration.service";
import {AuthModule} from "../auth/auth.module";

@Module({
    imports: [
        AuthModule,
        MongooseModule.forFeature([{name: 'config', schema: configurationSchema}]),
        configurationModel,
    ],
    controllers: [ConfigurationController],
    providers: [ConfigurationService],
    exports: [ConfigurationService],
})
export class ConfigurationModule {}
