import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Track } from './entities/track.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Track])],
    providers: [TracksService],
    controllers: [TracksController],
    exports: [TracksService],
})
export class TracksModule { } 