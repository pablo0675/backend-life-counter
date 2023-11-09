import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {ScheduleModule} from "@nestjs/schedule";
import { MongooseModule } from '@nestjs/mongoose'
import {JwtModule} from "@nestjs/jwt";
import {PassportModule} from "@nestjs/passport";
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
