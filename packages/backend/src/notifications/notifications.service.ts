import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';
import { EventsService } from '../events/events.service';
import { NotificationType } from './types/notification.type';

@Injectable()
export class NotificationsService {
    private readonly logger = new Logger(NotificationsService.name);

    constructor(
        @InjectRepository(Notification)
        private notificationsRepository: Repository<Notification>,
        private eventsService: EventsService,
    ) { }

    async create(userId: string, type: NotificationType, data: any): Promise<Notification> {
        const notification = this.notificationsRepository.create({
            userId,
            type,
            data,
        });

        const savedNotification = await this.notificationsRepository.save(notification);

        // Отправляем уведомление через WebSocket
        this.eventsService.emitToUser(userId, 'notification', savedNotification);

        return savedNotification;
    }

    async findAll(userId: string): Promise<Notification[]> {
        return this.notificationsRepository.find({
            where: { userId },
            order: { createdAt: 'DESC' },
        });
    }

    async markAsRead(id: string, userId: string): Promise<Notification> {
        const notification = await this.notificationsRepository.findOne({
            where: { id, userId },
        });

        if (!notification) {
            throw new Error('Notification not found');
        }

        notification.read = true;
        return this.notificationsRepository.save(notification);
    }

    async markAllAsRead(userId: string): Promise<void> {
        await this.notificationsRepository.update(
            { userId, read: false },
            { read: true },
        );
    }

    async delete(id: string, userId: string): Promise<void> {
        await this.notificationsRepository.delete({ id, userId });
    }

    async deleteAll(userId: string): Promise<void> {
        await this.notificationsRepository.delete({ userId });
    }
} 