import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post/entities/post.entity';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // those who dont have decorators
      forbidNonWhitelisted: true, // error for any non listed whitelisted
      transform: true,
      disableErrorMessages: false,
    }),
  );

  imports: [
    TypeOrmModule.forRoot({
      type:'postgres',
      host:'localhost',
      port:5432,
      username:'postgres',
      password: "root",
      database:'Nest',
      entities:[Post],
      synchronize:true,
    })
  ];
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
