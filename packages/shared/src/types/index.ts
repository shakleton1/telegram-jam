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
    password?: string;
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

export interface Message {
    id: string;
    userId: string;
    text: string;
    timestamp: number;
    type: 'text' | 'system';
}

export interface Notification {
    id: string;
    userId: string;
    type: 'track_added' | 'user_joined' | 'user_left' | 'track_removed' | 'room_created';
    data: any;
    read: boolean;
    createdAt: Date;
}

export interface SearchResult {
    tracks: Track[];
    total: number;
    offset: number;
    limit: number;
} 