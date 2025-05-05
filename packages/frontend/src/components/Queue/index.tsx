import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { RootState } from '../../store/types';
import { removeFromQueue } from '../../store/slices/playerSlice';

const Queue: React.FC = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { queue } = useSelector((state: RootState) => state.player);
    const user = useSelector((state: RootState) => state.auth.user);

    if (queue.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-gray-500 dark:text-gray-400">
                <p>{t('queueEmpty')}</p>
                <p className="text-sm mt-2">{t('addTracksToQueue')}</p>
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {t('nextInQueue')} ({queue.length})
            </h3>

            <div className="flex-1 overflow-y-auto">
                <AnimatePresence>
                    {queue.map((track, index) => (
                        <motion.div
                            key={track.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            transition={{ duration: 0.2 }}
                            className="flex items-center space-x-4 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg group"
                        >
                            <div className="flex-shrink-0 w-12 h-12">
                                <img
                                    src={track.coverUrl || '/default-cover.png'}
                                    alt={track.title}
                                    className="w-full h-full object-cover rounded"
                                />
                            </div>

                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                    {track.title}
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                                    {track.artist}
                                </p>
                                <div className="flex items-center mt-1 text-xs text-gray-500 dark:text-gray-400">
                                    <span>
                                        {t('addedBy')}: {track.addedBy.firstName}
                                    </span>
                                    <span className="mx-2">•</span>
                                    <span>{track.votes.length} {t('votes')}</span>
                                </div>
                            </div>

                            <div className="flex items-center space-x-2">
                                {user && (
                                    <button
                                        onClick={() => dispatch(removeFromQueue(track.id))}
                                        className="p-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <TrashIcon className="w-5 h-5" />
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
};

const TrashIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
        />
    </svg>
);

export default Queue; 