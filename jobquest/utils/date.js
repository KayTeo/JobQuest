export function getCurrentDate(epochDate, separator = "/") {
    const newDate = new Date(epochDate);
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    return `${date < 10 ? ` 0${date}` : `${date}`}${separator}${
        month < 10 ? `0${month}` : `${month}`
    }${separator}${year}`;
}
