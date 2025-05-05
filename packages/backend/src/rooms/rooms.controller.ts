import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('rooms')
@Controller('rooms')
@UseGuards(JwtAuthGuard)
export class RoomsController {
    constructor(private readonly roomsService: RoomsService) { }

    @Post()
    @ApiOperation({ summary: 'Create room' })
    @ApiResponse({ status: 201, description: 'Room created' })
    create(@Body() roomData: any, @CurrentUser() user: User) {
        return this.roomsService.create({
            ...roomData,
            ownerId: user.id,
        });
    }

    @Get()
    @ApiOperation({ summary: 'Get all rooms' })
    @ApiResponse({ status: 200, description: 'Return all rooms' })
    findAll() {
        return this.roomsService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get room by id' })
    @ApiResponse({ status: 200, description: 'Return room' })
    findOne(@Param('id') id: string) {
        return this.roomsService.findOne(id);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update room' })
    @ApiResponse({ status: 200, description: 'Room updated' })
    update(@Param('id') id: string, @Body() roomData: any) {
        return this.roomsService.update(id, roomData);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete room' })
    @ApiResponse({ status: 200, description: 'Room deleted' })
    remove(@Param('id') id: string) {
        return this.roomsService.remove(id);
    }

    @Post(':id/join')
    @ApiOperation({ summary: 'Join room' })
    @ApiResponse({ status: 200, description: 'User joined room' })
    joinRoom(@Param('id') id: string, @CurrentUser() user: User) {
        return this.roomsService.addUser(id, user.id);
    }

    @Post(':id/leave')
    @ApiOperation({ summary: 'Leave room' })
    @ApiResponse({ status: 200, description: 'User left room' })
    leaveRoom(@Param('id') id: string, @CurrentUser() user: User) {
        return this.roomsService.removeUser(id, user.id);
    }
} 