import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpStatus, ValidationPipe, VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // enable cors
  app.enableCors({
    origin: '*',
  });
  // global prefix
  app.setGlobalPrefix('api'); // localhost:4000/api (ทุก route)
  // api versioning
  app.enableVersioning({
    type: VersioningType.URI,
  });
  // enable auto validation
  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY, // 422 default is 400
    }),
  );

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
