export const formatTime = (date: Date): string => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
        return `${days} ${days === 1 ? 'день' : 'дней'} назад`;
    }
    if (hours > 0) {
        return `${hours} ${hours === 1 ? 'час' : 'часов'} назад`;
    }
    if (minutes > 0) {
        return `${minutes} ${minutes === 1 ? 'минуту' : 'минут'} назад`;
    }
    return 'только что';
}; 