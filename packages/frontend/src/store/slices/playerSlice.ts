import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PlayerState, Track } from '../types';

const initialState: PlayerState = {
    currentTrack: null,
    queue: [],
    isPlaying: false,
    currentTime: 0,
    volume: 1,
    isMuted: false,
};

const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        setCurrentTrack: (state, action: PayloadAction<Track | null>) => {
            state.currentTrack = action.payload;
            if (action.payload) {
                state.isPlaying = true;
                state.currentTime = 0;
            }
        },
        setQueue: (state, action: PayloadAction<Track[]>) => {
            state.queue = action.payload;
        },
        addToQueue: (state, action: PayloadAction<Track>) => {
            state.queue.push(action.payload);
        },
        removeFromQueue: (state, action: PayloadAction<string>) => {
            state.queue = state.queue.filter(track => track.id !== action.payload);
        },
        setIsPlaying: (state, action: PayloadAction<boolean>) => {
            state.isPlaying = action.payload;
        },
        setCurrentTime: (state, action: PayloadAction<number>) => {
            state.currentTime = action.payload;
        },
        setVolume: (state, action: PayloadAction<number>) => {
            state.volume = action.payload;
            if (action.payload > 0) {
                state.isMuted = false;
            }
        },
        setIsMuted: (state, action: PayloadAction<boolean>) => {
            state.isMuted = action.payload;
        },
        nextTrack: (state) => {
            if (state.queue.length > 0) {
                state.currentTrack = state.queue[0];
                state.queue = state.queue.slice(1);
                state.currentTime = 0;
                state.isPlaying = true;
            } else {
                state.currentTrack = null;
                state.isPlaying = false;
                state.currentTime = 0;
            }
        },
    },
});

export const {
    setCurrentTrack,
    setQueue,
    addToQueue,
    removeFromQueue,
    setIsPlaying,
    setCurrentTime,
    setVolume,
    setIsMuted,
    nextTrack,
} = playerSlice.actions;

export default playerSlice.reducer; 