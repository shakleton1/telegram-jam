import { Dispatch } from 'redux';
import { ThunkDispatch } from '@reduxjs/toolkit';

export interface User {
    id: string;
    telegramId: string;
    firstName: string;
    lastName?: string;
    username?: string;
    photoUrl?: string;
    isAdmin: boolean;
    isActive: boolean;
}

export interface Room {
    id: string;
    name: string;
    description?: string;
    isPrivate: boolean;
    maxUsers: number;
    owner: User;
    activeUsers: User[];
    currentTrack?: Track;
    queue: Track[];
    isActive: boolean;
}

export interface Track {
    id: string;
    title: string;
    artist: string;
    album?: string;
    duration: number;
    source: 'spotify' | 'youtube';
    sourceId: string;
    coverUrl?: string;
    previewUrl?: string;
    addedBy: User;
    votes: string[];
    position: number;
    isPlaying: boolean;
    currentTime: number;
}

export interface AuthState {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    error: string | null;
}

export interface RoomState {
    currentRoom: Room | null;
    availableRooms: Room[];
    isLoading: boolean;
    error: string | null;
}

export interface PlayerState {
    currentTrack: Track | null;
    queue: Track[];
    isPlaying: boolean;
    currentTime: number;
    volume: number;
    isMuted: boolean;
}

export interface RootState {
    auth: AuthState;
    room: RoomState;
    player: PlayerState;
}

export type AppDispatch = ThunkDispatch<RootState, unknown, any>; 