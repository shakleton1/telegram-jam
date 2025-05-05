import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/types';
import { setCurrentRoom } from '../../store/slices/roomSlice';
import Player from '../../components/Player';
import Queue from '../../components/Queue';
import Chat from '../../components/Chat';
import TrackSearch from '../../components/TrackSearch';

const Room: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { currentRoom, isLoading, error } = useSelector((state: RootState) => state.room);
    const user = useSelector((state: RootState) => state.auth.user);

    useEffect(() => {
        if (!id) return;

        const connectToRoom = async () => {
            try {
                // Здесь будет API запрос для получения информации о комнате
                const response = await fetch(`/api/rooms/${id}`);
                if (!response.ok) {
                    throw new Error('Room not found');
                }
                const roomData = await response.json();
                dispatch(setCurrentRoom(roomData));
            } catch (error) {
                console.error('Error connecting to room:', error);
                navigate('/');
            }
        };

        connectToRoom();

        // Отключаемся при размонтировании
        return () => {
            dispatch(setCurrentRoom(null));
        };
    }, [id, dispatch, navigate]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (error || !currentRoom) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {t('roomNotFound')}
                </h2>
                <button
                    onClick={() => navigate('/')}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    {t('backToHome')}
                </button>
            </div>
        );
    }

    return (
        <div className="h-screen flex flex-col">
            <div className="flex-1 overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-full p-4">
                    {/* Левая колонка: плеер и очередь */}
                    <div className="lg:col-span-2 flex flex-col space-y-4">
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
                            <Player />
                        </div>
                        <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg shadow p-4 overflow-hidden">
                            <Queue />
                        </div>
                    </div>

                    {/* Правая колонка: поиск и чат */}
                    <div className="flex flex-col space-y-4">
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
                            <TrackSearch />
                        </div>
                        <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg shadow p-4 overflow-hidden">
                            <Chat />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Room; 