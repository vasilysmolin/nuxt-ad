function dateFormat(date) {
    if (date) {
        const dates = new Date(date);
        const formatter = new Intl.DateTimeFormat('ru-RU', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
        return formatter.format(dates);
    }
    return null;
}

export {
    dateFormat,
};
