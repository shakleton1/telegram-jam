import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Room } from '../../rooms/entities/room.entity';
import { User } from '../../users/entities/user.entity';

@Entity('tracks')
export class Track {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    artist: string;

    @Column({ nullable: true })
    album: string;

    @Column()
    duration: number;

    @Column()
    source: string; // 'spotify' | 'youtube'

    @Column()
    sourceId: string;

    @Column({ nullable: true })
    coverUrl: string;

    @Column({ nullable: true })
    previewUrl: string;

    @ManyToOne(() => Room, room => room.tracks)
    @JoinColumn()
    room: Room;

    @Column()
    roomId: string;

    @ManyToOne(() => User)
    @JoinColumn()
    addedBy: User;

    @Column()
    addedById: string;

    @Column({ type: 'jsonb', default: [] })
    votes: string[];

    @Column({ default: 0 })
    position: number;

    @Column({ default: false })
    isPlaying: boolean;

    @Column({ default: 0 })
    currentTime: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
} 