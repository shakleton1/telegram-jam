import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/types';
import LanguageSwitcher from '../LanguageSwitcher';
import ThemeSwitcher from '../ThemeSwitcher';

const Header: React.FC = () => {
    const { t } = useTranslation();
    const user = useSelector((state: RootState) => state.auth.user);

    return (
        <header className="bg-white dark:bg-gray-800 shadow">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <Link to="/" className="text-2xl font-bold text-gray-900 dark:text-white">
                        Telegram JAM
                    </Link>

                    <div className="flex items-center space-x-4">
                        <LanguageSwitcher />
                        <ThemeSwitcher />
                        {user && (
                            <div className="flex items-center space-x-2">
                                <img
                                    src={user.photoUrl || '/default-avatar.png'}
                                    alt={user.firstName}
                                    className="w-8 h-8 rounded-full"
                                />
                                <span className="text-gray-700 dark:text-gray-300">
                                    {user.firstName}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header; 