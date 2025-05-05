import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { RootState } from '../../store/types';
import {
    setIsPlaying,
    setCurrentTime,
    setVolume,
    setIsMuted,
    nextTrack,
} from '../../store/slices/playerSlice';

const Player: React.FC = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const audioRef = useRef<HTMLAudioElement>(null);
    const {
        currentTrack,
        isPlaying,
        currentTime,
        volume,
        isMuted,
    } = useSelector((state: RootState) => state.player);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = isMuted ? 0 : volume;
        }
    }, [volume, isMuted]);

    useEffect(() => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.play();
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying]);

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            dispatch(setCurrentTime(audioRef.current.currentTime));
        }
    };

    const handleEnded = () => {
        dispatch(nextTrack());
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseFloat(e.target.value);
        dispatch(setVolume(newVolume));
        if (newVolume > 0) {
            dispatch(setIsMuted(false));
        }
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (audioRef.current) {
            const time = parseFloat(e.target.value);
            audioRef.current.currentTime = time;
            dispatch(setCurrentTime(time));
        }
    };

    const togglePlay = () => {
        dispatch(setIsPlaying(!isPlaying));
    };

    const toggleMute = () => {
        dispatch(setIsMuted(!isMuted));
    };

    if (!currentTrack) {
        return (
            <div className="flex items-center justify-center h-32 text-gray-500 dark:text-gray-400">
                {t('noTrackPlaying')}
            </div>
        );
    }

    return (
        <div className="flex flex-col space-y-4">
            <audio
                ref={audioRef}
                src={currentTrack.previewUrl}
                onTimeUpdate={handleTimeUpdate}
                onEnded={handleEnded}
            />

            {/* Информация о треке */}
            <div className="flex items-center space-x-4">
                <motion.img
                    src={currentTrack.coverUrl || '/default-cover.png'}
                    alt={currentTrack.title}
                    className="w-16 h-16 rounded-lg shadow"
                    animate={{ rotate: isPlaying ? 360 : 0 }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                />
                <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                        {currentTrack.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        {currentTrack.artist}
                    </p>
                </div>
            </div>

            {/* Прогресс-бар */}
            <div className="space-y-2">
                <input
                    type="range"
                    min={0}
                    max={currentTrack.duration}
                    value={currentTime}
                    onChange={handleSeek}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                />
                <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(currentTrack.duration)}</span>
                </div>
            </div>

            {/* Контролы */}
            <div className="flex items-center justify-between">
                <button
                    onClick={toggleMute}
                    className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                    {isMuted ? (
                        <VolumeOffIcon className="w-6 h-6" />
                    ) : (
                        <VolumeUpIcon className="w-6 h-6" />
                    )}
                </button>

                <div className="flex items-center space-x-4">
                    <button
                        onClick={() => dispatch(nextTrack())}
                        className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                    >
                        <PreviousIcon className="w-6 h-6" />
                    </button>

                    <button
                        onClick={togglePlay}
                        className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {isPlaying ? (
                            <PauseIcon className="w-8 h-8" />
                        ) : (
                            <PlayIcon className="w-8 h-8" />
                        )}
                    </button>

                    <button
                        onClick={() => dispatch(nextTrack())}
                        className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                    >
                        <NextIcon className="w-6 h-6" />
                    </button>
                </div>

                <div className="w-24">
                    <input
                        type="range"
                        min={0}
                        max={1}
                        step={0.01}
                        value={isMuted ? 0 : volume}
                        onChange={handleVolumeChange}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                    />
                </div>
            </div>
        </div>
    );
};

const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

// Иконки (можно заменить на свои или использовать библиотеку)
const PlayIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M8 5v14l11-7z" />
    </svg>
);

const PauseIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
    </svg>
);

const PreviousIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
    </svg>
);

const NextIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
    </svg>
);

const VolumeUpIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
    </svg>
);

const VolumeOffIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
    </svg>
);

export default Player; 