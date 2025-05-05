import React from 'react';
import { useTranslation } from 'react-i18next';

const Footer: React.FC = () => {
    const { t } = useTranslation();
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white dark:bg-gray-800 shadow mt-auto">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <p className="text-gray-600 dark:text-gray-400">
                        © {currentYear} Telegram JAM. {t('allRightsReserved')}
                    </p>
                    <div className="flex items-center space-x-4">
                        <a
                            href="https://github.com/your-username/telegram-jam"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                        >
                            GitHub
                        </a>
                        <a
                            href="https://t.me/your_bot"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                        >
                            Telegram
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer; 