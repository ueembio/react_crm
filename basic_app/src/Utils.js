export const getIsAdmin = () => {
    const isAdmin = sessionStorage.getItem('isAdmin');
    return (isAdmin === '1') ? true : false;
};

export const getTemperatureUnit = () => {
    const temperatureUnit = sessionStorage.getItem('temperatureUnit');
    return temperatureUnit;
};

export const convertCToF = (celsius) => {
    var fahrenheit = Math.round(celsius * 9 / 5 + 32);
    return fahrenheit
}

export const convertFToC = (fahrenheit) => {
    var celsius = Math.round((fahrenheit - 32) * (5 / 9));
    return celsius
}

export const getLoggedInUserId = () => {
    const id = sessionStorage.getItem('id');
    return id;
};

export const getLoggedInUserFullName = () => {
    const userfullname = sessionStorage.getItem('userfullname');
    return userfullname;
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
