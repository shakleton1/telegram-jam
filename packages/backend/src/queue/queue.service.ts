import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QueueItem } from './entities/queue-item.entity';
import { TracksService } from '../tracks/tracks.service';

@Injectable()
export class QueueService {
    constructor(
        @InjectRepository(QueueItem)
        private queueRepository: Repository<QueueItem>,
        private tracksService: TracksService,
    ) { }

    async addToQueue(userId: string, trackId: string, roomId: string): Promise<QueueItem> {
        const track = await this.tracksService.findOne(trackId);
        const lastPosition = await this.getLastPosition(roomId);

        const queueItem = this.queueRepository.create({
            userId,
            trackId,
            roomId,
            position: lastPosition + 1,
        });

        return this.queueRepository.save(queueItem);
    }

    async getQueue(roomId: string): Promise<QueueItem[]> {
        return this.queueRepository.find({
            where: { roomId },
            order: { position: 'ASC' },
            relations: ['user', 'track'],
        });
    }

    async removeFromQueue(id: string, userId: string): Promise<void> {
        await this.queueRepository.delete({ id, userId });
    }

    async clearQueue(roomId: string): Promise<void> {
        await this.queueRepository.delete({ roomId });
    }

    private async getLastPosition(roomId: string): Promise<number> {
        const lastItem = await this.queueRepository.findOne({
            where: { roomId },
            order: { position: 'DESC' },
        });

        return lastItem ? lastItem.position : -1;
    }
} 