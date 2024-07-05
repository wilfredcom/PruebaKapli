import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { SeedService } from './seed/seed.service';

async function bootstrap() {
  const logger = new Logger("Bootstrap");
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix("api/v1");
  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist:true,
      forbidNonWhitelisted:true
    })
  );

  //Ejecutar el SeedService siempre que se ejecute la aplicacion
  const seedService = app.get(SeedService);
  seedService.executeSeed();

  const port = process.env.PORT || 3000;
  logger.log(`Application running on port ${port}`);
  await app.listen(port);
}
bootstrap();
