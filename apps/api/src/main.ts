import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { ValidationPipe, Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const globalPrefix = 'v1/api';
  // app.setGlobalPrefix(globalPrefix);
  app.useGlobalPipes(new ValidationPipe());
  const port = process.env.port || 3333;
  await app.listen(port, () => {
    Logger.log(`Listening at http://localhost:${port}/`, 'BootstrapApp');
  });
}

bootstrap();
