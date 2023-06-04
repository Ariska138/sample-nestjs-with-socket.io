import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Request, Response } from 'express';
import * as express from 'express';
import { join } from 'path';
import { ExpressAdapter } from '@nestjs/platform-express';

async function bootstrap() {
  const app = express();
  const nestApp = await NestFactory.create(AppModule, new ExpressAdapter(app));

  // Uncomment these lines to use the Redis adapter:
  // const redisIoAdapter = new RedisIoAdapter(app);
  // await redisIoAdapter.connectToRedis();
  // app.useWebSocketAdapter(redisIoAdapter);

  app.use(express.static(join(__dirname, '../client')));

  app.get('/', async (req: Request, res: Response) => {
    try {
      res.sendFile(join(__dirname, '../client/index.html'));

    } catch (err) {
      console.log(err);
      res.send('Error reading HTML file').status(500);
    }
  });

  await nestApp.listen(3000);
  console.log(`Application is running on: ${await nestApp.getUrl()}`);
}

bootstrap();
