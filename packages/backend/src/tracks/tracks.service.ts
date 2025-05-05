import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Track } from './entities/track.entity';
import { SpotifyService } from './services/spotify.service';
import { YoutubeService } from './services/youtube.service';

@Injectable()
export class TracksService {
    constructor(
        @InjectRepository(Track)
        private tracksRepository: Repository<Track>,
        private spotifyService: SpotifyService,
        private youtubeService: YoutubeService,
    ) { }

    async findOne(id: string): Promise<Track> {
        return this.tracksRepository.findOneOrFail({ where: { id } });
    }

    async findByRoom(roomId: string): Promise<Track[]> {
        return this.tracksRepository.find({
            where: { roomId },
            order: { position: 'ASC' },
            relations: ['addedBy'],
        });
    }

    async search(query: string, source: 'spotify' | 'youtube'): Promise<any[]> {
        if (source === 'spotify') {
            return this.spotifyService.searchTracks(query);
        } else {
            return this.youtubeService.searchTracks(query);
        }
    }

    async addTrack(trackData: Partial<Track>): Promise<Track> {
        const track = this.tracksRepository.create(trackData);
        return this.tracksRepository.save(track);
    }

    async removeTrack(id: string): Promise<void> {
        await this.tracksRepository.delete(id);
    }

    async updateTrack(id: string, trackData: Partial<Track>): Promise<Track> {
        await this.tracksRepository.update(id, trackData);
        return this.tracksRepository.findOneOrFail({ where: { id } });
    }
} 