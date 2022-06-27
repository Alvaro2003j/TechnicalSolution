import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder().setTitle('Technical Solution :)')
  .setDescription('Creators')
  .setVersion('1.0')
  .addTag('technical solution')
  .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('', app, document, 
  {
    explorer: true,
    swaggerOptions: {
      filter: true
    }
  });
  await app.listen(8080);
}
bootstrap();
