import axios from 'axios';

export const filters = [
    {
        filterName: 'all',
        filterPlaceholder: 'Все'
    },
    {
        filterName: 'design',
        filterPlaceholder: 'Дизайн'
    },
    {
        filterName: 'analytics',
        filterPlaceholder: 'Аналитика'
    },
    {
        filterName: 'management',
        filterPlaceholder: 'Менеджмент'
    },
    {
        filterName: 'ios',
        filterPlaceholder: 'iOS'
    },
    {
        filterName: 'android',
        filterPlaceholder: 'Android'
    },
];

export const departmentsToRussian = {
    android: 'Android',
    ios: 'iOS',
    design: 'Дизайн',
    management: 'Менеджмент',
    qa: 'QA',
    back_office: 'Бэк-офис',
    frontend: 'Frontend',
    hr: 'HR',
    pr: 'PR',
    backend: 'Backend',
    support: 'Техподдержка',
    analytics: 'Аналитика',
}

export const comparators = {
    'alphabetic': {
        'comparator': (a, b) => (a.lastName.localeCompare(b.lastName)),
        'description': 'По алфавиту'
    },
    'birthdate': {
        'comparator': (a, b) => {
            const monthA = parseInt(a.birthday.split('-')[1]);
            const dayA = parseInt(a.birthday.split('-')[2]);
            const monthB = parseInt(b.birthday.split('-')[1]);
            const dayB = parseInt(b.birthday.split('-')[2]);
            return compareDates(monthA, monthB, dayA, dayB)
        },
        'description': 'По дню рождения'
    }
}

export const getWorkers = (filter) =>
    // axios.get(`https://stoplight.io/mocks/kode-frontend-team/koder-stoplight/86566464/users?${(Math.random() < 0.4) ? '__code=500' : ''}&__dynamic=true`)
    axios.get(`https://stoplight.io/mocks/kode-frontend-team/koder-stoplight/86566464/users?${(Math.random() < 0.4) ? '__code=500' : ''}&__example=${filter}`)
        .then((response) => response.data.items)
        .then((workers) => {
            console.log('workers in request: ', workers);
            return workers
        })
        .catch((err) => {
            console.error(err);
            return null
        });

export const updateWorkers = (filter, callback) => {
    getWorkers(filter)
        .then((workers) => {
            console.log('workers in Details componentDidMount: ', workers);
            callback(workers)
        })
}

export function compareDates(monthA, monthB, dayA, dayB) {
    if (monthA > monthB) { return 1 }
    else if (monthA < monthB) { return -1 }
    else {
        if (dayA > dayB) { return 1 }
        else if (dayA < dayB) { return -1 }
        else return 0
    }
}


export function compareWorkerBirthdateWithNow(worker) {
    const dateNow = new Date();
    const monthNow = parseInt(dateNow.getMonth()) + 1;
    const dayNow = parseInt(dateNow.getDate());

    // const monthNow = 5;
    // const dayNow = 25;

    const monthA = parseInt(worker.birthday.split('-')[1]);
    const dayA = parseInt(worker.birthday.split('-')[2]);

    return compareDates(monthNow, monthA, dayNow, dayA)
}

export function reorderWorkers(sortedWorkers) {
    let workersAfter = [];
    let workersBefore = [];

    let firstNexYear = true;

    for (let worker of sortedWorkers) {
        delete worker.firstNexYear;
    }

    for (let worker of sortedWorkers) {
        switch (compareWorkerBirthdateWithNow(worker)) {
            case 1:
                if (firstNexYear) {
                    worker.firstNexYear = true;
                    firstNexYear = false;
                }
                workersBefore.push(worker);
                break
            case -1:
                workersAfter.push(worker);
                break
            default:
                workersAfter.push(worker);
        }
    }

    const workers = workersAfter.concat(workersBefore)
    console.log('reorderWorkers: ', workers);

    return workers
}

export function dateToHuman(date, short = true) {

    if (!date) { return '' }

    const monthNames = {
        '01': 'января',
        '02': 'февраля',
        '03': 'марта',
        '04': 'апреля',
        '05': 'май',
        '06': 'июня',
        '07': 'июля',
        '08': 'августа',
        '09': 'сентября',
        '10': 'октября',
        '11': 'ноября',
        '12': 'декабря',

    }
    const [year, month, day] = date?.split('-');
    const humanDate = short ? `${parseInt(day)} ${monthNames[month].slice(0, 3)}` : `${parseInt(day)} ${monthNames[month]} ${year}`
    return humanDate
}