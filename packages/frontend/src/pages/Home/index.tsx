import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/types';
import RoomList from '../../components/RoomList';
import CreateRoomModal from '../../components/CreateRoomModal';

const Home: React.FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false);
    const { availableRooms, isLoading } = useSelector((state: RootState) => state.room);

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    {t('welcome')}
                </h1>
                <button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    {t('createRoom')}
                </button>
            </div>

            {isLoading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
            ) : (
                <RoomList rooms={availableRooms} onRoomClick={(id) => navigate(`/room/${id}`)} />
            )}

            <CreateRoomModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
            />
        </div>
    );
};

export default Home;