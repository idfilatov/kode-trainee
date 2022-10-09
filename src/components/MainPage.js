import React, { useEffect, useState } from 'react'
import axios from 'axios';

import Header from './Header'
import WorkersList from './WorkersList'


const getWorkers = (filter) =>
    axios.get(`https://stoplight.io/mocks/kode-frontend-team/koder-stoplight/86566464/users?__example=${filter}`)
        // .then((response) => response.json())
        .then((response) => response.data.items)
        .then((workers) => {
            console.log('workers in request: ', workers);
            return workers
        })
        .catch((err) => console.error(err));



class MainPage extends React.Component {

    state = {
        query: '',
        filter: 'all',
        workers: []
    }

    updateWorkers = (filter) => {
        getWorkers(filter)
            .then((workers) => {
                console.log('workers in componentDidMount: ', workers);
                this.setState(() => ({
                    workers: workers
                }));
            })
    }

    componentDidMount() {
        this.updateWorkers('all');

        // axios.get("https://stoplight.io/mocks/kode-frontend-team/koder-stoplight/86566464/users?__example=frontend")
        //     // .then((response) => response.json())
        //     .then((response) => console.log('workers in request: ', response.data.items))
        //     .catch((err) => console.error(err));


    }

    updateQuery = (query) => {
        this.setState(() => ({
            query: query.trim()
        }));
        console.log('New query: ', query);
    }

    clearQuery = () => {
        this.updateQuery('');
    }

    updateFilter = (filter) => {
        this.setState(() => ({
            filter: filter,
            query: ''
        }));
        console.log('New filter: ', filter);
        // this.updateWorkers(filter);
    }

    render() {

        const filters = [
            {
                filterName: 'all',
                filterPlaceholder: 'Все'
            },
            {
                filterName: 'design',
                filterPlaceholder: 'Designers'
            },
            {
                filterName: 'analytics',
                filterPlaceholder: 'Analysts'
            },
            {
                filterName: 'management',
                filterPlaceholder: 'Managers'
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

        const { query, filter, workers } = this.state;
        const filteredWorkers = (filter === 'all')
            ? workers
            : workers.filter((w) => (w.department === filter));

        console.log('workers in render: ', filteredWorkers, 'with filter: ', filter);

        const showingWorkers = (query === '')
            ? filteredWorkers
            : filteredWorkers.filter((w) =>
            (
                w.firstName.toLowerCase().includes(query.toLowerCase()) ||
                w.lastName.toLowerCase().includes(query.toLowerCase()) ||
                w.userTag.toLowerCase().includes(query.toLowerCase())
            )
            );

        return (
            <div>
                Поиск
                <br />
                <input
                    className='search-contacts'
                    type='text'
                    placeholder='Search Contacts'
                    value={query}
                    onChange={(event) => this.updateQuery(event.target.value)}
                />
                <button onClick={this.clearQuery}>Очистить</button>
                <button>Сортировка</button>
                <div>
                    {filters.map((filter) => <button key={filter.filterName} onClick={() => this.updateFilter(filter.filterName)}>{filter.filterPlaceholder}</button>)}
                </div>
                <WorkersList workers={showingWorkers} />
            </div>
        )
    }

}


export default MainPage