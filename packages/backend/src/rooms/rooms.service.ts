import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room } from './entities/room.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class RoomsService {
    constructor(
        @InjectRepository(Room)
        private roomsRepository: Repository<Room>,
    ) { }

    async create(roomData: Partial<Room>): Promise<Room> {
        if (roomData.password) {
            roomData.password = await bcrypt.hash(roomData.password, 10);
        }
        const room = this.roomsRepository.create(roomData);
        return this.roomsRepository.save(room);
    }

    async findAll(): Promise<Room[]> {
        return this.roomsRepository.find({
            where: { isActive: true },
            relations: ['owner'],
        });
    }

    async findOne(id: string): Promise<Room> {
        return this.roomsRepository.findOneOrFail({
            where: { id },
            relations: ['owner'],
        });
    }

    async update(id: string, roomData: Partial<Room>): Promise<Room> {
        if (roomData.password) {
            roomData.password = await bcrypt.hash(roomData.password, 10);
        }
        await this.roomsRepository.update(id, roomData);
        return this.roomsRepository.findOneOrFail({
            where: { id },
            relations: ['owner'],
        });
    }

    async remove(id: string): Promise<void> {
        await this.roomsRepository.delete(id);
    }

    async addUser(roomId: string, userId: string): Promise<Room> {
        const room = await this.roomsRepository.findOneOrFail({
            where: { id: roomId },
        });

        if (!room.activeUsers.includes(userId)) {
            room.activeUsers = [...room.activeUsers, userId];
            return this.roomsRepository.save(room);
        }

        return room;
    }

    async removeUser(roomId: string, userId: string): Promise<Room> {
        const room = await this.roomsRepository.findOneOrFail({
            where: { id: roomId },
        });

        room.activeUsers = room.activeUsers.filter(id => id !== userId);
        return this.roomsRepository.save(room);
    }

    async verifyPassword(room: Room, password: string): Promise<boolean> {
        if (!room.password) return true;
        return bcrypt.compare(password, room.password);
    }
} 