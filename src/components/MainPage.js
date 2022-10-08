import React from 'react'

import Header from './Header'
import WorkersList from './WorkersList'

class MainPage extends React.Component {

    state = {
        query: '',
        filter: 'all'
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
            filter: filter
        }));
        console.log('New filter: ', filter);
    }

    render() {

        const filters = [
            {
                filterName: 'all',
                filterPlaceholder: 'Все'
            },
            {
                filterName: 'Designers',
                filterPlaceholder: 'Designers'
            },
            {
                filterName: 'Analysts',
                filterPlaceholder: 'Analysts'
            },
            {
                filterName: 'Managers',
                filterPlaceholder: 'Managers'
            },
            {
                filterName: 'iOS',
                filterPlaceholder: 'iOS'
            },
            {
                filterName: 'Android',
                filterPlaceholder: 'Android'
            },
        ];

        const { query } = this.state;
        const contacts = null;

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
                <WorkersList />
            </div>
        )
    }

}


export default MainPage