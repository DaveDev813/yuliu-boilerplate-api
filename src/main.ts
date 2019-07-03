import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const rateLimit = require('express-rate-limit');
  app
    .useGlobalPipes(
      new ValidationPipe({
        /**
         * disable for more detailed debugging
         */
        disableErrorMessages: false,

        /**
         * Strictly apply tranformation of payload to DTO classes
         */
        transform: true,
      }),
    )
    .enableCors({
      origin : true,
      credentials:true
    })
    .use(
      rateLimit({
        /** max 100 requests in 5mins */
        windowMs: 5 * 60 * 1000,
        max: 100,
      }),
    )
    .use(session({
      secret: 'asupersecrettokennobodyknows',
      name : 'sess_app',
      resave: false,
      rolling: true, /** Resets the expiration of the session */
      saveUninitialized: false,
      cookie : { maxAge : 30 * (60 * 1000) /** 30 minutes */}
    }));

  const options = new DocumentBuilder().addBearerAuth().build();
  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}

bootstrap();
