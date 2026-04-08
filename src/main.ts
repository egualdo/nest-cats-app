import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      // se usa para transoformar los datos de entrada a los tipos definidos en los DTOs, por ejemplo, convertir strings a números
      //  si el DTO lo especifica
    }),
  );

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
