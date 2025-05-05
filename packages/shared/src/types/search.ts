import { Track } from './index';

export interface SearchResult {
    tracks: Track[];
    total: number;
    offset: number;
    limit: number;
} 