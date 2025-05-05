import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TelegramService } from './telegram.service';
import { TelegramController } from './telegram.controller';
import telegramConfig from '../config/telegram.config';

@Module({
    imports: [
        ConfigModule.forFeature(telegramConfig),
    ],
    providers: [TelegramService],
    controllers: [TelegramController],
    exports: [TelegramService],
})
export class TelegramModule { } 