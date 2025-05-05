import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { SearchResult } from '@telegram-jam/shared';
import { addTrack } from '../../store/slices/roomSlice';
import { AppDispatch } from '../../store/types';

const TrackSearch: React.FC = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch<AppDispatch>();
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchResult | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;

        setIsLoading(true);
        try {
            const response = await fetch(`/api/tracks/search?q=${encodeURIComponent(query)}`);
            const data = await response.json();
            setResults(data);
        } catch (error) {
            console.error('Error searching tracks:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddTrack = async (trackId: string) => {
        try {
            const response = await fetch('/api/tracks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ trackId }),
            });
            const track = await response.json();
            dispatch(addTrack(track));
        } catch (error) {
            console.error('Error adding track:', error);
        }
    };

    return (
        <div className="space-y-4">
            <form onSubmit={handleSearch} className="flex space-x-2">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={t('searchTracks')}
                    className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
                <button
                    type="submit"
                    disabled={isLoading}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                >
                    {isLoading ? t('searching') : t('search')}
                </button>
            </form>

            {results && (
                <div className="space-y-2">
                    {results.tracks.map((track) => (
                        <div
                            key={track.id}
                            className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                            {track.coverUrl && (
                                <img
                                    src={track.coverUrl}
                                    alt={track.title}
                                    className="w-12 h-12 rounded"
                                />
                            )}
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                    {track.title}
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                                    {track.artist}
                                </p>
                            </div>
                            <button
                                onClick={() => handleAddTrack(track.id)}
                                className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                            >
                                <PlusIcon className="w-5 h-5" />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const PlusIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
        />
    </svg>
);

export default TrackSearch; 