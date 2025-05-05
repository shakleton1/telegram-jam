import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Track } from '../../tracks/entities/track.entity';
import { Room } from '../../rooms/entities/room.entity';

@Entity('queue_items')
export class QueueItem {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'userId' })
    user: User;

    @Column()
    userId: string;

    @ManyToOne(() => Track)
    @JoinColumn({ name: 'trackId' })
    track: Track;

    @Column()
    trackId: string;

    @ManyToOne(() => Room)
    @JoinColumn({ name: 'roomId' })
    room: Room;

    @Column()
    roomId: string;

    @Column({ default: false })
    isPlaying: boolean;

    @Column({ default: 0 })
    position: number;

    @CreateDateColumn()
    createdAt: Date;
} 