import { Injectable } from '@nestjs/common';
import { Server } from 'socket.io';

@Injectable()
export class EventsService {
    private server: Server;

    setServer(server: Server) {
        this.server = server;
    }

    emitToUser(userId: string, event: string, data: any) {
        this.server.to(userId).emit(event, data);
    }

    emitToRoom(roomId: string, event: string, data: any) {
        this.server.to(roomId).emit(event, data);
    }
} 