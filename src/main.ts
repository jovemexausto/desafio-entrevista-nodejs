import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

NestFactory.create(AppModule).then(bootstrap);

async function bootstrap(app: INestApplication) {
  createSwaggerDocument(app);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.listen(3000);
}

function createSwaggerDocument(app: INestApplication) {
  const document = SwaggerModule.createDocument(
    app,
    new DocumentBuilder().setTitle('Parking API').setVersion('0.0.1').build(),
  );
  SwaggerModule.setup('api', app, document);
}
