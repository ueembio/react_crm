
export const getIsAdmin = () => {
    const isAdmin = sessionStorage.getItem('isAdmin');
    return isAdmin;
};

export const getLoggedInUserId = () => {
    const id = sessionStorage.getItem('id');
    return id;
};

export const dateToFormattedString = (date) => {
    var now = date.toLocaleString();
    return now;
}

export const formatDate = (date) => {

    if (date === null) {
        return '';
    }

    if (date === '') {
        return '';
    }

    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

export const formatDateTime = (date) => {

    if (date === null) {
        return '';
    }

    if (date === '') {
        return '';
    }

    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear(),
        hour = d.getHours(),
        minutes = d.getMinutes(),
        seconds = d.getSeconds();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-') + " " + [hour, minutes, seconds].join(':');
}
