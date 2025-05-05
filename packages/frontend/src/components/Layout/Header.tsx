import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/types';
import LanguageSwitcher from '../LanguageSwitcher';
import ThemeSwitcher from '../ThemeSwitcher';
import Notifications from '../Notifications';

const Header: React.FC = () => {
    const { t } = useTranslation();
    const user = useSelector((state: RootState) => state.auth.user);

    return (
        <header className="bg-white dark:bg-gray-800 shadow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <Link
                            to="/"
                            className="flex items-center text-xl font-bold text-gray-900 dark:text-white"
                        >
                            Telegram JAM
                        </Link>
                    </div>

                    <div className="flex items-center space-x-4">
                        {user && <Notifications />}
                        <LanguageSwitcher />
                        <ThemeSwitcher />
                        {user ? (
                            <div className="flex items-center space-x-2">
                                <img
                                    src={user.photoUrl}
                                    alt={user.firstName}
                                    className="h-8 w-8 rounded-full"
                                />
                                <span className="text-gray-700 dark:text-gray-300">
                                    {user.firstName}
                                </span>
                            </div>
                        ) : (
                            <Link
                                to="/login"
                                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                            >
                                {t('login')}
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header; 