const months = ["янв", "фев", "мар", "апр", "мая", "июня", "июля", "авг", "сент", "окт", "нояб", "дек"];

export const formatDate = (element: Date) => {
    let date = element.getDate();
    let month = months[element.getMonth()];
    let year = element.getFullYear();

    const newDate = `${date} ${month} ${year} г.`;

    return newDate;
}