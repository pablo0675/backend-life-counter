import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {ScheduleModule} from "@nestjs/schedule";
import { MongooseModule } from '@nestjs/mongoose'
import {JwtModule} from "@nestjs/jwt";
import {PassportModule} from "@nestjs/passport";
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigurationModule } from './configuration/configurationModule';
import { CounterModule } from './counter/counter.module';

@Module({
  imports: [
      ConfigModule.forRoot(
          {isGlobal: true,}
      ),
      ScheduleModule.forRoot(),
      MongooseModule.forRootAsync({
          imports: undefined,
          useFactory: async (configService: ConfigService) => ({
              uri: configService.get<string>('MONGO_URI'),
          }),
          inject: [ConfigService]
      }),
      PassportModule.register({ defaultStrategy: 'jwt' }),
      JwtModule.registerAsync({
          imports: undefined,
          useFactory: async (configService: ConfigService) => ({
              secret: configService.get<string>('JWT_KEY'),
              signOptions: { expiresIn: '60m' },
          }),
          inject: [ConfigService]
      }),
      AuthModule,
      UserModule,
      ConfigurationModule,
      CounterModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
