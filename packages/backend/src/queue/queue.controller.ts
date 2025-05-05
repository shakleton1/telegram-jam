import { Controller, Get, Post, Delete, Param, UseGuards } from '@nestjs/common';
import { QueueService } from './queue.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('queue')
@Controller('queue')
@UseGuards(JwtAuthGuard)
export class QueueController {
    constructor(private readonly queueService: QueueService) { }

    @Get(':roomId')
    @ApiOperation({ summary: 'Get room queue' })
    @ApiResponse({ status: 200, description: 'Return room queue' })
    getQueue(@Param('roomId') roomId: string) {
        return this.queueService.getQueue(roomId);
    }

    @Post(':roomId/tracks/:trackId')
    @ApiOperation({ summary: 'Add track to queue' })
    @ApiResponse({ status: 200, description: 'Track added to queue' })
    addToQueue(
        @Param('roomId') roomId: string,
        @Param('trackId') trackId: string,
        @CurrentUser() user: User,
    ) {
        return this.queueService.addToQueue(user.id, trackId, roomId);
    }

    @Delete(':roomId/tracks/:id')
    @ApiOperation({ summary: 'Remove track from queue' })
    @ApiResponse({ status: 200, description: 'Track removed from queue' })
    removeFromQueue(
        @Param('roomId') roomId: string,
        @Param('id') id: string,
        @CurrentUser() user: User,
    ) {
        return this.queueService.removeFromQueue(id, user.id);
    }

    @Delete(':roomId')
    @ApiOperation({ summary: 'Clear room queue' })
    @ApiResponse({ status: 200, description: 'Room queue cleared' })
    clearQueue(@Param('roomId') roomId: string) {
        return this.queueService.clearQueue(roomId);
    }
} 