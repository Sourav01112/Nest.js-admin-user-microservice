import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as ip from 'ip';
import { ValidationPipe } from '@nestjs/common';



const localIp = ip.address();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: ['http://localhost:3000', 'https://yourfrontend.com'],
  });

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(`🚀 Server is running on ${localIp} at port - ${port}`);
}
bootstrap();
