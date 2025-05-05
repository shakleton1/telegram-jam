import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('telegram')
@Controller('telegram')
export class TelegramController {
    constructor(private readonly telegramService: TelegramService) { }

    @Post('webhook')
    @ApiOperation({ summary: 'Handle Telegram webhook' })
    @ApiResponse({ status: 200, description: 'Webhook processed successfully' })
    async handleWebhook(@Body() update: any) {
        await this.telegramService.handleUpdate(update);
        return { status: 'ok' };
    }

    @Get('webhook')
    @ApiOperation({ summary: 'Verify webhook' })
    @ApiResponse({ status: 200, description: 'Webhook verified' })
    async verifyWebhook() {
        return { status: 'ok' };
    }
} 