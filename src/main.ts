import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as session from 'express-session';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<string>('server.port');
  console.log(process.env.COOKIE_SECRET)

  app.use(cookieParser(process.env.COOKIE_SECRET));
  app.use(bodyParser.json());
  app.use(
    cors({
      origin: 'http://localhost:8080',
      credentials: true,
    }),
  );

  app.use(
    session({
      secret: process.env.COOKIE_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false, httpOnly: true },
    }),
    
  );

  app.use(passport.initialize());
  app.use(passport.session());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.use(function (req: any, res: any, next: any) {
    next();
  });

  await app.listen(port);
}
bootstrap();
