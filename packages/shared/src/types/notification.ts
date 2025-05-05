export type NotificationType =
    | 'track_added'
    | 'user_joined'
    | 'user_left'
    | 'track_removed'
    | 'room_created';

export interface NotificationData {
    userName: string;
    trackName?: string;
    roomName?: string;
    message?: string;
}

export interface Notification {
    id: string;
    userId: string;
    type: NotificationType;
    data: NotificationData;
    read: boolean;
    createdAt: Date;
} 