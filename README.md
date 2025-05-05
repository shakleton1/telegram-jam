# Telegram Jam

Музыкальный джем-сервис с интеграцией Telegram для совместного прослушивания музыки.

## Содержание
- [Требования](#требования)
- [Установка](#установка)
- [Настройка окружения](#настройка-окружения)
- [Запуск проекта](#запуск-проекта)
- [Развертывание](#развертывание)
- [API Документация](#api-документация)
- [Мониторинг и логирование](#мониторинг-и-логирование)
- [Обновление](#обновление)
- [Устранение неполадок](#устранение-неполадок)
- [Безопасность](#безопасность)
- [Поддержка](#поддержка)

## Требования

### Системные требования
- Node.js 18.x или выше
  - Проверка версии: `node -v`
  - Установка: [Node.js Downloads](https://nodejs.org/en/download/)
  - Возможные проблемы:
    - Несовместимость версий: используйте nvm для управления версиями
    - Проблемы с правами доступа: запустите установщик от администратора
    - Конфликты с другими версиями: удалите старые версии

- PostgreSQL 14.x или выше
  - Проверка версии: `psql --version`
  - Установка:
    - Windows: [PostgreSQL Installer](https://www.postgresql.org/download/windows/)
    - Linux: `sudo apt install postgresql`
    - macOS: `brew install postgresql`
  - Возможные проблемы:
    - Порт 5432 занят: измените порт в конфигурации
    - Проблемы с правами: настройте pg_hba.conf
    - Недостаточно памяти: настройте shared_buffers

- Redis 6.x или выше
  - Проверка версии: `redis-cli --version`
  - Установка:
    - Windows: [Redis Windows](https://github.com/microsoftarchive/redis/releases)
    - Linux: `sudo apt install redis-server`
    - macOS: `brew install redis`
  - Возможные проблемы:
    - Порт 6379 занят: измените порт в redis.conf
    - Проблемы с памятью: настройте maxmemory
    - Проблемы с правами: проверьте права доступа к сокету

- Docker (опционально)
  - Проверка версии: `docker --version`
  - Установка: [Docker Desktop](https://www.docker.com/products/docker-desktop)
  - Возможные проблемы:
    - Виртуализация отключена: включите в BIOS
    - Недостаточно ресурсов: настройте лимиты в Docker Desktop
    - Проблемы с сетью: проверьте настройки брандмауэра

### API Ключи

1. **Telegram Bot API**
   - Создание бота:
     1. Откройте [@BotFather](https://t.me/BotFather)
     2. Отправьте команду `/newbot`
     3. Следуйте инструкциям для создания имени и username
     4. Сохраните полученный токен
   - Настройка webhook:
     1. Установите webhook: `https://api.telegram.org/bot<TOKEN>/setWebhook?url=<YOUR_DOMAIN>/api/telegram/webhook`
     2. Проверьте статус: `https://api.telegram.org/bot<TOKEN>/getWebhookInfo`
   - Возможные проблемы:
     - Неверный токен: проверьте правильность копирования
     - Проблемы с SSL: убедитесь, что используется HTTPS
     - Ограничения webhook: проверьте лимиты Telegram

2. **Spotify API**
   - Регистрация приложения:
     1. Перейдите на [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
     2. Создайте новое приложение
     3. Добавьте redirect URI: `http://localhost:3000/api/auth/spotify/callback`
     4. Сохраните Client ID и Client Secret
   - Настройка разрешений:
     1. Включите необходимые scopes: `user-read-private`, `user-read-email`, `playlist-read-private`
     2. Настройте политику конфиденциальности
   - Возможные проблемы:
     - Ошибки аутентификации: проверьте redirect URI
     - Ограничения API: следите за квотами
     - Проблемы с токенами: проверьте срок действия

3. **YouTube API**
   - Настройка проекта:
     1. Перейдите на [Google Cloud Console](https://console.cloud.google.com)
     2. Создайте новый проект
     3. Включите YouTube Data API v3
     4. Создайте API ключ
   - Ограничения:
     1. Настройте квоты в консоли
     2. Ограничьте доступ по IP
     3. Настройте OAuth 2.0 если необходимо
   - Возможные проблемы:
     - Превышение квот: настройте ограничения
     - Ошибки API: проверьте формат запросов
     - Проблемы с ключом: проверьте ограничения

## Установка

1. Клонирование репозитория:
```bash
# Клонирование
git clone https://github.com/your-username/telegram-jam.git
cd telegram-jam

# Проверка ветки
git checkout main

# Обновление подмодулей
git submodule update --init --recursive
```

2. Установка зависимостей:
```bash
# Корневая директория
npm install

# Бэкенд
cd packages/backend
npm install
npm run build

# Фронтенд
cd ../frontend
npm install
npm run build
```

Возможные проблемы:
- Конфликты версий: используйте `package-lock.json`
- Проблемы с нативными модулями: установите build tools
- Ошибки сборки: проверьте версии Node.js и npm

## Настройка окружения

### Бэкенд (packages/backend/.env)
```env
# База данных
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_DATABASE=telegram_jam

# JWT
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRES_IN=7d

# Telegram Bot
TELEGRAM_BOT_TOKEN=your_bot_token_here
TELEGRAM_WEBHOOK_URL=https://your-domain.com/api/telegram/webhook
TELEGRAM_BOT_USERNAME=your_bot_username

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# Spotify API
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret

# YouTube API
YOUTUBE_API_KEY=your_youtube_api_key

# Server
PORT=3000
NODE_ENV=development

# Дополнительные настройки
LOG_LEVEL=info
CORS_ORIGIN=http://localhost:5173
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX=100
```

### Фронтенд (packages/frontend/.env)
```env
# API URL
VITE_API_URL=http://localhost:3000/api

# WebSocket URL
VITE_WS_URL=ws://localhost:3000

# Telegram Bot
VITE_TELEGRAM_BOT_USERNAME=your_bot_username

# Локализация
VITE_DEFAULT_LOCALE=ru
VITE_AVAILABLE_LOCALES=ru,en

# Дополнительные настройки
VITE_APP_NAME=Telegram Jam
VITE_APP_VERSION=1.0.0
VITE_DEBUG=false
VITE_SENTRY_DSN=your_sentry_dsn
```

## Запуск проекта

### Локальная разработка

1. Запуск PostgreSQL:
```bash
# Windows
net start postgresql

# Linux
sudo service postgresql start

# macOS
brew services start postgresql

# Проверка статуса
pg_isready
```

2. Запуск Redis:
```bash
# Windows
redis-server

# Linux
sudo service redis-server start

# macOS
brew services start redis

# Проверка статуса
redis-cli ping
```

3. Запуск бэкенда:
```bash
cd packages/backend
npm run start:dev

# Проверка логов
tail -f logs/backend.log
```

4. Запуск фронтенда:
```bash
cd packages/frontend
npm run dev

# Проверка логов
tail -f logs/frontend.log
```

### Использование Docker

1. Сборка образов:
```bash
# Сборка всех образов
docker-compose build

# Сборка конкретного сервиса
docker-compose build backend
docker-compose build frontend
```

2. Запуск контейнеров:
```bash
# Запуск всех контейнеров
docker-compose up -d

# Запуск конкретного сервиса
docker-compose up -d backend
docker-compose up -d frontend

# Проверка статуса
docker-compose ps
```

3. Логи контейнеров:
```bash
# Все логи
docker-compose logs -f

# Логи конкретного сервиса
docker-compose logs -f backend
docker-compose logs -f frontend
```

## Развертывание

### Подготовка к продакшену

1. Сборка фронтенда:
```bash
cd packages/frontend
npm run build

# Проверка сборки
ls -la dist
```

2. Сборка бэкенда:
```bash
cd packages/backend
npm run build

# Проверка сборки
ls -la dist
```

### Настройка веб-сервера (Nginx)

1. Установка Nginx:
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install nginx

# CentOS
sudo yum install epel-release
sudo yum install nginx

# Проверка установки
nginx -v
```

2. Конфигурация Nginx:
```nginx
# /etc/nginx/sites-available/telegram-jam
server {
    listen 80;
    server_name your-domain.com;

    # Логи
    access_log /var/log/nginx/telegram-jam.access.log;
    error_log /var/log/nginx/telegram-jam.error.log;

    # Фронтенд
    location / {
        root /path/to/frontend/dist;
        try_files $uri $uri/ /index.html;
        
        # Кэширование
        expires 1h;
        add_header Cache-Control "public, no-transform";
    }

    # API
    location /api {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        
        # Таймауты
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # WebSocket
    location /ws {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
        proxy_set_header Host $host;
        
        # Таймауты
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # Безопасность
    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-XSS-Protection "1; mode=block";
    add_header X-Content-Type-Options "nosniff";
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains";
}
```

3. Настройка SSL:
```bash
# Установка Certbot
sudo apt install certbot python3-certbot-nginx

# Получение сертификата
sudo certbot --nginx -d your-domain.com

# Автоматическое обновление
sudo certbot renew --dry-run
```

### Настройка PM2

1. Установка PM2:
```bash
npm install -g pm2

# Проверка установки
pm2 --version
```

2. Конфигурация PM2:
```javascript
// ecosystem.config.js
module.exports = {
  apps: [{
    name: 'telegram-jam-backend',
    script: 'dist/main.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: 'logs/err.log',
    out_file: 'logs/out.log',
    log_file: 'logs/combined.log',
    time: true,
    max_memory_restart: '1G',
    exp_backoff_restart_delay: 100
  }]
}
```

3. Запуск приложения:
```bash
# Запуск
pm2 start ecosystem.config.js

# Проверка статуса
pm2 status

# Мониторинг
pm2 monit
```

## API Документация

1. Swagger UI:
   - URL: `http://localhost:3000/api/docs`
   - Аутентификация: Bearer Token
   - Тестирование: встроенный Swagger UI

2. OpenAPI JSON:
   - URL: `http://localhost:3000/api-json`
   - Использование: импорт в Postman/Insomnia

## Мониторинг и логирование

### Логи
1. Бэкенд:
   - Основной лог: `logs/backend.log`
   - Ошибки: `logs/error.log`
   - Доступ: `logs/access.log`

2. Фронтенд:
   - Основной лог: `logs/frontend.log`
   - Ошибки: `logs/error.log`
   - Сборка: `logs/build.log`

### Мониторинг
1. PM2:
   - Статус: `pm2 status`
   - Мониторинг: `pm2 monit`
   - Метрики: `pm2 metrics`

2. Системные метрики:
   - CPU: `pm2 monit`
   - Память: `pm2 monit`
   - Сеть: `pm2 monit`

## Обновление

1. Получение обновлений:
```bash
# Сохранение изменений
git stash

# Получение обновлений
git pull origin main

# Применение изменений
git stash pop
```

2. Обновление зависимостей:
```bash
# Проверка устаревших пакетов
npm outdated

# Обновление пакетов
npm update

# Проверка безопасности
npm audit
npm audit fix
```

3. Пересборка и перезапуск:
```bash
# Бэкенд
cd packages/backend
npm run build
pm2 restart telegram-jam-backend

# Фронтенд
cd packages/frontend
npm run build
```

## Устранение неполадок

### Общие проблемы

1. **Ошибка подключения к базе данных**
   - Проверка настроек:
     ```bash
     # Проверка подключения
     psql -h localhost -U postgres -d telegram_jam
     
     # Проверка прав
     \du
     
     # Проверка таблиц
     \dt
     ```
   - Решение проблем:
     - Сброс пароля: `ALTER USER postgres WITH PASSWORD 'new_password';`
     - Проверка pg_hba.conf
     - Проверка сетевых настроек

2. **Ошибка Redis**
   - Проверка подключения:
     ```bash
     # Проверка статуса
     redis-cli ping
     
     # Проверка памяти
     redis-cli info memory
     
     # Проверка клиентов
     redis-cli client list
     ```
   - Решение проблем:
     - Очистка кэша: `redis-cli FLUSHALL`
     - Перезапуск: `sudo service redis-server restart`
     - Проверка конфигурации

3. **Проблемы с Telegram ботом**
   - Проверка webhook:
     ```bash
     # Проверка статуса
     curl https://api.telegram.org/bot<TOKEN>/getWebhookInfo
     
     # Установка webhook
     curl https://api.telegram.org/bot<TOKEN>/setWebhook?url=<URL>
     ```
   - Решение проблем:
     - Проверка SSL сертификата
     - Проверка доступности домена
     - Проверка токена

### Логирование ошибок

1. Включение отладки:
```bash
# Бэкенд
export LOG_LEVEL=debug
export NODE_ENV=development

# Фронтенд
export VITE_DEBUG=true
```

2. Проверка логов:
```bash
# PM2 логи
pm2 logs

# Nginx логи
tail -f /var/log/nginx/error.log

# Системные логи
journalctl -u nginx
```

## Безопасность

1. Обновление зависимостей:
```bash
# Проверка уязвимостей
npm audit

# Автоматическое исправление
npm audit fix

# Принудительное обновление
npm audit fix --force
```

2. Мониторинг безопасности:
- Регулярная проверка логов
- Мониторинг подозрительной активности
- Проверка SSL сертификатов

3. Настройка HTTPS:
- Использование Let's Encrypt
- Настройка HSTS
- Проверка SSL конфигурации

4. Управление ключами:
- Регулярная ротация ключей
- Безопасное хранение
- Ограничение доступа

## Поддержка

1. Создание issue:
- Подробное описание проблемы
- Шаги для воспроизведения
- Ожидаемое поведение
- Фактическое поведение

2. Предоставление информации:
- Версии компонентов
- Логи ошибок
- Конфигурация (без секретов)

3. Коммуникация:
- Использование шаблонов
- Следование правилам
- Своевременные ответы 
