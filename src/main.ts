import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
// import * as csurf from 'csurf';
// import rateLimit from 'express-rate-limit';

async function bootstrap(){

  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({

    /**
     * disable for more detailed debugging
     */
    disableErrorMessages: false,

    /**
     * Strictly apply tranformation of payload to DTO classes 
     */
    transform: true,

  }))
  .enableCors()
  // .use(csurf())
  // .use(rateLimit({ 
  //   /** max 100 requests in 10mins */
  //   windowMs: (10 * 60) * 1000, 
  //   max: 100 
  // }));

  const options  = new DocumentBuilder().addBearerAuth().build();
  const document = SwaggerModule.createDocument(app, options);
  
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}

bootstrap();
