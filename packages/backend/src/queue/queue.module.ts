import { Module } from '@nestjs/common';
import { QueueService } from './queue.service';
import { QueueController } from './queue.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QueueItem } from './entities/queue-item.entity';
import { TracksModule } from '../tracks/tracks.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([QueueItem]),
        TracksModule,
    ],
    providers: [QueueService],
    controllers: [QueueController],
    exports: [QueueService],
})
export class QueueModule { } 