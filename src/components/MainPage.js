import React from 'react'

import Modal from './Modal'
import WorkersList from './WorkersList';
import NoSearchResults from './NoSearchResults';
import ErrorPage from './ErrorPage';
import Search from './Search';
import FiltersPanel from './FiltersPanel';

import { reorderWorkers } from './../utils'
import { comparators } from './../utils'


class MainPage extends React.Component {

    state = {
        query: '',
        filter: 'all',
        workers: [],
        sortType: 'alphabetic',
        modal: false
    }

    componentDidMount() {
        this.setState(() => ({
            workers: this.props.workers
        }))
    }

    updateQuery = (query) => {
        this.setState(() => ({
            query: query.trim()
        }));
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
    }

    render() {
        const { query, filter, sortType, modal } = this.state;
        let { workers } = this.state;
        let error = false;
        if (workers === null) {
            workers = [];
            error = true;
        }
        const filteredWorkers = (filter === 'all')
            ? workers
            : workers.filter((w) => (w.department === filter));

        const showingWorkers = (query === '')
            ? filteredWorkers
            : filteredWorkers.filter((w) =>
            (
                w.firstName.toLowerCase().includes(query.toLowerCase()) ||
                w.lastName.toLowerCase().includes(query.toLowerCase()) ||
                w.userTag.toLowerCase().includes(query.toLowerCase())
            )
            );

        let sortedWorkers = showingWorkers.sort(comparators[sortType]['comparator']);
        if (sortType === 'birthdate') {
            sortedWorkers = reorderWorkers(sortedWorkers)
        }

        return (
            <div>
                {modal
                    ? <Modal
                        comparators={comparators}
                        sortType={sortType}
                        onChangeHandler={this.selectSorting}
                        onCloseHandler={this.toggleModal}
                    />
                    : null
                }
                <div className='header'>
                    <div className='header-spacing'></div>
                    <div className='header-hello-panel'>
                        <div className='header-hello'>Поиск</div>
                    </div>

                    <Search
                        query={query}
                        updateQuery={this.updateQuery}
                        clearQuery={this.clearQuery}
                        toggleModal={this.toggleModal}
                    />

                    <FiltersPanel
                        filter={filter}
                        updateFilter={this.updateFilter}
                    />
                </div>
                {
                    error
                        ? <ErrorPage /> :
                        (sortedWorkers.length > 0)
                            ? <WorkersList sortedWorkers={sortedWorkers} sortType={sortType} />
                            : (query !== '')
                                ? <NoSearchResults />
                                : null
                }
            </div >
        )
    }
}


export default MainPage