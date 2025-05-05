import { Controller, Get, Post, Delete, Param, Body, UseGuards, Query } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('tracks')
@Controller('tracks')
@UseGuards(JwtAuthGuard)
export class TracksController {
    constructor(private readonly tracksService: TracksService) { }

    @Get('search')
    @ApiOperation({ summary: 'Search tracks' })
    @ApiResponse({ status: 200, description: 'Return search results' })
    search(
        @Query('query') query: string,
        @Query('source') source: 'spotify' | 'youtube',
    ) {
        return this.tracksService.search(query, source);
    }

    @Get('room/:roomId')
    @ApiOperation({ summary: 'Get room tracks' })
    @ApiResponse({ status: 200, description: 'Return room tracks' })
    getRoomTracks(@Param('roomId') roomId: string) {
        return this.tracksService.findByRoom(roomId);
    }

    @Post('room/:roomId')
    @ApiOperation({ summary: 'Add track to room' })
    @ApiResponse({ status: 200, description: 'Track added to room' })
    addTrack(
        @Param('roomId') roomId: string,
        @Body() trackData: any,
        @CurrentUser() user: User,
    ) {
        return this.tracksService.addTrack({
            ...trackData,
            roomId,
            addedById: user.id,
        });
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Remove track' })
    @ApiResponse({ status: 200, description: 'Track removed' })
    removeTrack(@Param('id') id: string) {
        return this.tracksService.removeTrack(id);
    }
} 