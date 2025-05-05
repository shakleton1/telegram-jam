import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class YoutubeService {
    private readonly logger = new Logger(YoutubeService.name);
    private readonly apiKey: string;

    constructor(private configService: ConfigService) {
        const apiKey = this.configService.get<string>('youtube.apiKey');
        if (!apiKey) {
            throw new Error('YouTube API key is not defined');
        }
        this.apiKey = apiKey;
    }

    async searchTracks(query: string, limit: number = 10) {
        try {
            const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
                params: {
                    part: 'snippet',
                    q: query,
                    type: 'video',
                    maxResults: limit,
                    key: this.apiKey,
                },
            });

            return response.data.items.map((item: any) => ({
                id: item.id.videoId,
                title: item.snippet.title,
                artist: item.snippet.channelTitle,
                coverUrl: item.snippet.thumbnails.high.url,
                source: 'youtube',
                sourceId: item.id.videoId,
            }));
        } catch (error) {
            this.logger.error('Error searching YouTube tracks:', error);
            throw error;
        }
    }

    async getTrackDetails(videoId: string) {
        try {
            const response = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
                params: {
                    part: 'contentDetails,snippet',
                    id: videoId,
                    key: this.apiKey,
                },
            });

            const video = response.data.items[0];
            const duration = this.parseDuration(video.contentDetails.duration);

            return {
                id: video.id,
                title: video.snippet.title,
                artist: video.snippet.channelTitle,
                coverUrl: video.snippet.thumbnails.high.url,
                duration,
                source: 'youtube',
                sourceId: video.id,
            };
        } catch (error) {
            this.logger.error('Error getting YouTube track details:', error);
            throw error;
        }
    }

    private parseDuration(duration: string): number {
        const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
        if (!match) return 0;

        const hours = (match[1] && parseInt(match[1])) || 0;
        const minutes = (match[2] && parseInt(match[2])) || 0;
        const seconds = (match[3] && parseInt(match[3])) || 0;
        return hours * 3600 + minutes * 60 + seconds;
    }
} 