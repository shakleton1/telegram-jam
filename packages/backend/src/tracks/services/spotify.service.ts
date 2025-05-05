import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class SpotifyService {
    private readonly logger = new Logger(SpotifyService.name);
    private readonly clientId: string;
    private readonly clientSecret: string;
    private accessToken: string | null = null;
    private tokenExpiration: number = 0;

    constructor(private configService: ConfigService) {
        const clientId = this.configService.get<string>('spotify.clientId');
        const clientSecret = this.configService.get<string>('spotify.clientSecret');

        if (!clientId || !clientSecret) {
            throw new Error('Spotify credentials are not defined');
        }

        this.clientId = clientId;
        this.clientSecret = clientSecret;
    }

    private async getAccessToken() {
        if (this.accessToken && Date.now() < this.tokenExpiration) {
            return this.accessToken;
        }

        try {
            const response = await axios.post(
                'https://accounts.spotify.com/api/token',
                'grant_type=client_credentials',
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        Authorization: `Basic ${Buffer.from(
                            `${this.clientId}:${this.clientSecret}`,
                        ).toString('base64')}`,
                    },
                },
            );

            this.accessToken = response.data.access_token;
            this.tokenExpiration = Date.now() + (response.data.expires_in * 1000);
            return this.accessToken;
        } catch (error) {
            this.logger.error('Error getting Spotify access token:', error);
            throw error;
        }
    }

    async searchTracks(query: string, limit: number = 10) {
        try {
            const token = await this.getAccessToken();
            const response = await axios.get('https://api.spotify.com/v1/search', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    q: query,
                    type: 'track',
                    limit,
                },
            });

            return response.data.tracks.items.map((track: any) => ({
                id: track.id,
                title: track.name,
                artist: track.artists.map((a: any) => a.name).join(', '),
                album: track.album.name,
                duration: Math.floor(track.duration_ms / 1000),
                coverUrl: track.album.images[0]?.url,
                previewUrl: track.preview_url,
                source: 'spotify',
                sourceId: track.id,
            }));
        } catch (error) {
            this.logger.error('Error searching tracks:', error);
            throw error;
        }
    }

    async getTrackDetails(trackId: string) {
        try {
            const token = await this.getAccessToken();
            const response = await axios.get(`https://api.spotify.com/v1/tracks/${trackId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const track = response.data;
            return {
                id: track.id,
                title: track.name,
                artist: track.artists.map((a: any) => a.name).join(', '),
                album: track.album.name,
                duration: Math.floor(track.duration_ms / 1000),
                coverUrl: track.album.images[0]?.url,
                previewUrl: track.preview_url,
                source: 'spotify',
                sourceId: track.id,
            };
        } catch (error) {
            this.logger.error('Error getting track details:', error);
            throw error;
        }
    }
} 