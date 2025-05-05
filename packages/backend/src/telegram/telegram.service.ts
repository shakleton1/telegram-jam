import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class TelegramService {
    private readonly logger = new Logger(TelegramService.name);
    private readonly botToken: string;
    private readonly apiUrl: string;

    constructor(
        private configService: ConfigService,
        private usersService: UsersService,
    ) {
        const token = this.configService.get<string>('telegram.botToken');
        if (!token) {
            throw new Error('Telegram bot token is not defined');
        }
        this.botToken = token;
        this.apiUrl = `https://api.telegram.org/bot${this.botToken}`;
    }

    async handleUpdate(update: any) {
        try {
            if (update.message) {
                await this.handleMessage(update.message);
            } else if (update.callback_query) {
                await this.handleCallbackQuery(update.callback_query);
            }
        } catch (error) {
            this.logger.error('Error handling update:', error);
        }
    }

    private async handleMessage(message: any) {
        const { from, text, chat } = message;

        // Создаем или обновляем пользователя
        const user = await this.usersService.findByTelegramId(from.id.toString());
        if (!user) {
            await this.usersService.create({
                telegramId: from.id.toString(),
                firstName: from.first_name,
                lastName: from.last_name,
                username: from.username,
                photoUrl: from.photo?.file_id,
            });
        }

        // Обработка команд
        if (text?.startsWith('/')) {
            await this.handleCommand(text, chat.id);
        }
    }

    private async handleCallbackQuery(callbackQuery: any) {
        const { data, message, from } = callbackQuery;

        // Обработка callback данных
        if (data.startsWith('join_room_')) {
            const roomId = data.replace('join_room_', '');
            // Логика присоединения к комнате
        }
    }

    private async handleCommand(command: string, chatId: number) {
        switch (command) {
            case '/start':
                await this.sendMessage(chatId, 'Добро пожаловать в Telegram JAM! 🎵');
                break;
            case '/help':
                await this.sendMessage(chatId, 'Доступные команды:\n/start - Начать\n/help - Помощь\n/create - Создать комнату\n/join - Присоединиться к комнате');
                break;
            case '/create':
                // Логика создания комнаты
                break;
            case '/join':
                // Логика присоединения к комнате
                break;
        }
    }

    async sendMessage(chatId: number, text: string, options: any = {}) {
        try {
            await axios.post(`${this.apiUrl}/sendMessage`, {
                chat_id: chatId,
                text,
                parse_mode: 'HTML',
                ...options,
            });
        } catch (error) {
            this.logger.error('Error sending message:', error);
        }
    }

    async sendInlineKeyboard(chatId: number, text: string, keyboard: any) {
        await this.sendMessage(chatId, text, {
            reply_markup: {
                inline_keyboard: keyboard,
            },
        });
    }
} 