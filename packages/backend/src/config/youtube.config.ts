import { registerAs } from '@nestjs/config';

export default registerAs('youtube', () => ({
    apiKey: process.env.YOUTUBE_API_KEY,
})); 