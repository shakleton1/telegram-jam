import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Track } from '../../tracks/entities/track.entity';

@Entity('rooms')
export class Room {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ nullable: true })
    description: string;

    @Column({ default: false })
    isPrivate: boolean;

    @Column({ nullable: true })
    password: string;

    @Column({ default: 10 })
    maxUsers: number;

    @ManyToOne(() => User)
    @JoinColumn()
    owner: User;

    @Column()
    ownerId: string;

    @OneToMany(() => Track, track => track.room)
    tracks: Track[];

    @Column({ type: 'jsonb', default: [] })
    activeUsers: string[];

    @Column({ default: true })
    isActive: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
} 