import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV == 'production'
        ? '.production.env'
        : '.development.env',
      load: [configuration]    
    }),
    MongooseModule.forRoot(process.env.MONGOURL),

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
