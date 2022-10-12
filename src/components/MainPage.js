import React from 'react'

import Modal from './Modal'
import WorkersList from './WorkersList';
import NoSearchResults from './NoSearchResults';
import ErrorPage from './ErrorPage';

import { reorderWorkers } from './../utils'
import { filters, comparators } from './../utils'


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

        let sortedWorkers = showingWorkers.sort(comparators[sortType]['comparator']);
        if (sortType === 'birthdate') {
            sortedWorkers = reorderWorkers(sortedWorkers)
        }

        console.log('sortedWorkers in render: ', filteredWorkers, 'with filter: ', filter);


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

                    <div className='header-search-panel'>
                        <div className='header-search-bar'>
                            <i className="material-icons" >search</i>
                            <input
                                className='header-search'
                                type='text'
                                placeholder='Введи имя, тег, почту...'
                                value={query}
                                onChange={(event) => this.updateQuery(event.target.value)}
                            />
                            {query !== ''
                                ? <button className='header-sort' onClick={this.clearQuery}>
                                    <i className="material-icons" >close</i>
                                </button> : null
                            }

                            <button className='header-sort' onClick={this.toggleModal}>
                                <i className="material-icons" >sort</i>
                            </button>
                        </div>

                    </div>
                    <div className='header-filters-panel'>
                        <div className='header-filter-tabs'>
                            <div className='header-filter-tabs-holder'>
                                {filters.map((f) => <button
                                    className={filter === f.filterName ? 'header-filter-button-active' : 'header-filter-button'}
                                    key={f.filterName}
                                    onClick={() => this.updateFilter(f.filterName)}>
                                    <div className={filter === f.filterName ? 'header-filter-button-text-active' : 'header-filter-button-text'}>
                                        {f.filterPlaceholder}
                                    </div>

                                </button>)}
                            </div>
                        </div>
                        <hr />
                    </div>
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