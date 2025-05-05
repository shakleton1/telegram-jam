import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // Включаем CORS
    app.enableCors();

    // Включаем валидацию
    app.useGlobalPipes(new ValidationPipe());

    // Настраиваем Swagger
    const config = new DocumentBuilder()
        .setTitle('Telegram JAM API')
        .setDescription('API для совместного прослушивания музыки через Telegram')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    // Запускаем сервер
    const port = process.env.PORT || 3000;
    await app.listen(port);
    console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap(); 