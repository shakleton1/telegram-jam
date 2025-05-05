import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('notifications')
export class Notification {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User)
    @JoinColumn()
    user: User;

    @Column()
    userId: string;

    @Column()
    type: 'track_added' | 'user_joined' | 'user_left' | 'track_removed' | 'room_created';

    @Column('jsonb')
    data: any;

    @Column({ default: false })
    read: boolean;

    @CreateDateColumn()
    createdAt: Date;
} 