import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import * as hbs from 'hbs';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'templates', 'pages'));
  hbs.registerPartials(join(__dirname, '..', 'templates'));
  app.setViewEngine('hbs');

  const port = process.env.PORT || 3000;
  await app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
}
bootstrap();
