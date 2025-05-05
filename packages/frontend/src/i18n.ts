import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
    en: {
        translation: {
            // Общие
            welcome: 'Welcome to Telegram JAM',
            createRoom: 'Create Room',
            joinRoom: 'Join Room',
            settings: 'Settings',
            logout: 'Logout',

            // Комната
            roomName: 'Room Name',
            description: 'Description',
            private: 'Private',
            password: 'Password',
            maxUsers: 'Max Users',
            create: 'Create',
            join: 'Join',
            leave: 'Leave Room',

            // Плеер
            play: 'Play',
            pause: 'Pause',
            next: 'Next',
            previous: 'Previous',
            addToQueue: 'Add to Queue',
            vote: 'Vote',

            // Поиск
            search: 'Search',
            searchPlaceholder: 'Search tracks...',
            noResults: 'No results found',

            // Ошибки
            error: 'Error',
            roomNotFound: 'Room not found',
            invalidPassword: 'Invalid password',
            roomFull: 'Room is full',
        },
    },
    ru: {
        translation: {
            // Общие
            welcome: 'Добро пожаловать в Telegram JAM',
            createRoom: 'Создать комнату',
            joinRoom: 'Присоединиться',
            settings: 'Настройки',
            logout: 'Выйти',

            // Комната
            roomName: 'Название комнаты',
            description: 'Описание',
            private: 'Приватная',
            password: 'Пароль',
            maxUsers: 'Макс. пользователей',
            create: 'Создать',
            join: 'Присоединиться',
            leave: 'Покинуть комнату',

            // Плеер
            play: 'Воспроизвести',
            pause: 'Пауза',
            next: 'Следующий',
            previous: 'Предыдущий',
            addToQueue: 'Добавить в очередь',
            vote: 'Голосовать',

            // Поиск
            search: 'Поиск',
            searchPlaceholder: 'Поиск треков...',
            noResults: 'Ничего не найдено',

            // Ошибки
            error: 'Ошибка',
            roomNotFound: 'Комната не найдена',
            invalidPassword: 'Неверный пароль',
            roomFull: 'Комната заполнена',
        },
    },
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: 'ru', // язык по умолчанию
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n; 