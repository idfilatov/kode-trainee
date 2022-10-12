import React, { Component, } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { createMemoryHistory } from 'history';

import './App.css';
import MainPage from './components/MainPage';
import WorkerDetailsPage from './components/WorkerDetailsPage';

import { updateWorkers } from './utils'

class App extends Component {
    state = {
        workers: []
    }

    componentDidMount() {
        updateWorkers(
            'all',
            workers => this.setState(() => ({
                workers: workers
            }))
        );
    }

    render() {
        const { workers } = this.state;
        const history = createMemoryHistory();
        return (
            <Router location={history.location}>
                <Route path='/' exact component={() => <MainPage workers={workers} />} />
                {/* <Route path='/:id' component={WorkerDetailsPage} /> */}
                <Route path='/:id' component={(history) => <WorkerDetailsPage workers={workers} history={history} />} />
            </Router>

        )
    }
}

export default App;
