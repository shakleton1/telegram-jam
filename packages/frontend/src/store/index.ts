import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import roomReducer from './slices/roomSlice';
import playerReducer from './slices/playerSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        room: roomReducer,
        player: playerReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Игнорируем некоторые non-serializable значения в состоянии
                ignoredActions: ['player/setAudioElement'],
                ignoredPaths: ['player.audioElement'],
            },
        }),
}); 