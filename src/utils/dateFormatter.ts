const formatDate = (date: Date): string => {
    const dateOptions: Intl.DateTimeFormatOptions = {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    };
    return date.toLocaleDateString('en-GB', dateOptions);
}

const formatTime = (date: Date): string => {
    const timeOptions: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'UTC',
        timeZoneName: 'short'
    };
    return date.toLocaleTimeString('en-GB', timeOptions);
}

export const formatDateTime = (): string => {
    const currentDate = new Date();

    return `${formatDate(currentDate)} ${formatTime(currentDate)}`;
}