import { registerAs } from '@nestjs/config';

export default registerAs('telegram', () => ({
    botToken: process.env.TELEGRAM_BOT_TOKEN,
    webhookUrl: process.env.TELEGRAM_WEBHOOK_URL,
    botUsername: process.env.TELEGRAM_BOT_USERNAME,
})); 