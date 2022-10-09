import React, { useEffect, useState } from 'react'
import axios from 'axios';

import Modal from './Modal'
import WorkersList from './WorkersList'
import WorkerItem from './WorkerItem';


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
        workers: [],
        sortType: 'alphabetic',
        modal: false
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

    toggleModal = () => {
        this.setState((prevState) => ({
            modal: !prevState.modal
        }));
    }

    selectSorting = (e) => {
        const newSortType = e.currentTarget.value
        console.log('New selected sorting: ', newSortType)
        this.setState(() => ({
            sortType: newSortType
        }));
        this.toggleModal()
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

        const comparators = {
            'alphabetic': {
                'comparator': (a, b) => (a.lastName.localeCompare(b.lastName)),
                'description': 'По алфавиту'
            },
            'birthdate': {
                'comparator': (a, b) => (a.lastName.localeCompare(b.lastName)),
                'description': 'По дню рождения'
            }
        }

        const { query, filter, workers, sortType, modal } = this.state;
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

        const sortedWorkers = showingWorkers.sort(comparators[sortType]['comparator']);
        // const sortedWorkers = showingWorkers.sort((a, b) => a.lastName.toLowerCase() - b.lastName.toLowerCase());

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
                <button onClick={this.toggleModal}>Сортировка</button>
                {modal
                    ? <Modal
                        comparators={comparators}
                        sortType={sortType}
                        onChangeHandler={this.selectSorting}
                    />
                    : null
                }
                <div>
                    {filters.map((filter) => <button key={filter.filterName} onClick={() => this.updateFilter(filter.filterName)}>{filter.filterPlaceholder}</button>)}
                </div>
                <ul>
                    {sortedWorkers.map((worker) =>
                        <WorkerItem
                            key={worker.id}
                            worker={worker}
                            sortType={sortType}
                        />)
                    }
                </ul>
            </div>
        )
    }

}


export default MainPage