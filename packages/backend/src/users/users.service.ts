import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    async create(userData: Partial<User>): Promise<User> {
        const user = this.usersRepository.create(userData);
        return this.usersRepository.save(user);
    }

    async findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    async findOne(id: string): Promise<User> {
        return this.usersRepository.findOneOrFail({ where: { id } });
    }

    async findByUsername(username: string): Promise<User | null> {
        return this.usersRepository.findOne({ where: { username } });
    }

    async findByTelegramId(telegramId: string): Promise<User | null> {
        return this.usersRepository.findOne({ where: { telegramId } });
    }

    async update(id: string, userData: Partial<User>): Promise<User> {
        await this.usersRepository.update(id, userData);
        return this.usersRepository.findOneOrFail({ where: { id } });
    }

    async remove(id: string): Promise<void> {
        await this.usersRepository.delete(id);
    }
} 