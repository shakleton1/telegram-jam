import { io, Socket } from 'socket.io-client';
import { store } from '../store';

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || 'http://localhost:3000';

class SocketService {
    private socket: Socket | null = null;

    connect() {
        if (this.socket?.connected) return;

        this.socket = io(SOCKET_URL, {
            auth: {
                token: store.getState().auth.token,
            },
        });

        this.socket.on('connect', () => {
            console.log('Socket connected');
        });

        this.socket.on('disconnect', () => {
            console.log('Socket disconnected');
        });

        this.socket.on('error', (error: Error) => {
            console.error('Socket error:', error);
        });
    }

    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
        }
    }

    emit(event: string, data: any) {
        if (!this.socket?.connected) {
            console.warn('Socket not connected');
            return;
        }
        this.socket.emit(event, data);
    }

    on(event: string, callback: (...args: any[]) => void) {
        if (!this.socket) {
            console.warn('Socket not initialized');
            return;
        }
        this.socket.on(event, callback);
    }

    off(event: string) {
        if (!this.socket) {
            console.warn('Socket not initialized');
            return;
        }
        this.socket.off(event);
    }
}

export const socket = new SocketService(); 