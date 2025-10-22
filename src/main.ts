// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);

//   // Enabling CORS for your frontend URL (localhost:3000)
//   app.enableCors({
//     origin: 'http://localhost:3000', // Your frontend URL
//     methods: 'GET,POST', // Add other methods if necessary
//     allowedHeaders: 'Content-Type, Authorization',
//   });

//   await app.listen(5001); // Ensure it listens on the correct port
// }

// bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for your frontend
  app.enableCors({
    origin: 'http://localhost:3000', // Allow requests from your frontend
    methods: ['GET', 'POST'], // Allow only specific methods (GET, POST, etc.)
    allowedHeaders: ['Content-Type'], // Allow specific headers
  });

  await app.listen(5001); // Your backend API is running on port 5001
}

bootstrap();
