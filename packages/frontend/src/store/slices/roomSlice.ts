import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RoomState, Room } from '../types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Track } from '../types';

const initialState: RoomState = {
    currentRoom: null,
    availableRooms: [],
    isLoading: false,
    error: null,
};

const roomSlice = createSlice({
    name: 'room',
    initialState,
    reducers: {
        setCurrentRoom: (state, action: PayloadAction<Room | null>) => {
            state.currentRoom = action.payload;
        },
        setAvailableRooms: (state, action: PayloadAction<Room[]>) => {
            state.availableRooms = action.payload;
        },
        addRoom: (state, action: PayloadAction<Room>) => {
            state.availableRooms.push(action.payload);
        },
        updateRoom: (state, action: PayloadAction<Room>) => {
            const index = state.availableRooms.findIndex(room => room.id === action.payload.id);
            if (index !== -1) {
                state.availableRooms[index] = action.payload;
            }
            if (state.currentRoom?.id === action.payload.id) {
                state.currentRoom = action.payload;
            }
        },
        removeRoom: (state, action: PayloadAction<string>) => {
            state.availableRooms = state.availableRooms.filter(room => room.id !== action.payload);
            if (state.currentRoom?.id === action.payload) {
                state.currentRoom = null;
            }
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(addTrack.fulfilled, (state, action) => {
            if (state.currentRoom) {
                state.currentRoom.queue.push(action.payload);
            }
        });
    },
});

export const {
    setCurrentRoom,
    setAvailableRooms,
    addRoom,
    updateRoom,
    removeRoom,
    setLoading,
    setError,
} = roomSlice.actions;

export const addTrack = createAsyncThunk(
    'room/addTrack',
    async (track: Track) => {
        // Реализация добавления трека
        return track;
    }
);

export default roomSlice.reducer; 