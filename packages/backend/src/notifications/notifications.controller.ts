import { Controller, Get, Post, Delete, Param, UseGuards } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('notifications')
@Controller('notifications')
@UseGuards(JwtAuthGuard)
export class NotificationsController {
    constructor(private readonly notificationsService: NotificationsService) { }

    @Get()
    @ApiOperation({ summary: 'Get all notifications' })
    @ApiResponse({ status: 200, description: 'Return all notifications' })
    findAll(@CurrentUser() user: User) {
        return this.notificationsService.findAll(user.id);
    }

    @Post(':id/read')
    @ApiOperation({ summary: 'Mark notification as read' })
    @ApiResponse({ status: 200, description: 'Notification marked as read' })
    markAsRead(@Param('id') id: string, @CurrentUser() user: User) {
        return this.notificationsService.markAsRead(id, user.id);
    }

    @Post('read-all')
    @ApiOperation({ summary: 'Mark all notifications as read' })
    @ApiResponse({ status: 200, description: 'All notifications marked as read' })
    markAllAsRead(@CurrentUser() user: User) {
        return this.notificationsService.markAllAsRead(user.id);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete notification' })
    @ApiResponse({ status: 200, description: 'Notification deleted' })
    delete(@Param('id') id: string, @CurrentUser() user: User) {
        return this.notificationsService.delete(id, user.id);
    }

    @Delete()
    @ApiOperation({ summary: 'Delete all notifications' })
    @ApiResponse({ status: 200, description: 'All notifications deleted' })
    deleteAll(@CurrentUser() user: User) {
        return this.notificationsService.deleteAll(user.id);
    }
} 