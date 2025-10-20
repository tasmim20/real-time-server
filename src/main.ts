import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enabling CORS for your frontend URL (localhost:3000)
  app.enableCors({
    origin: 'http://localhost:3000', // Your frontend URL
    methods: 'GET,POST', // Add other methods if necessary
    allowedHeaders: 'Content-Type, Authorization',
  });

  await app.listen(5001); // Ensure it listens on the correct port
}

bootstrap();
