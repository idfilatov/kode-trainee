import React, { Component, } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import './App.css';
import MainPage from './components/MainPage';
import WorkerDetailsPage from './components/WorkerDetailsPage';

class App extends Component {
  render() {
    return (
      <Router>

        <Route path='/' exact component={MainPage} />
        <Route path='/:id' component={WorkerDetailsPage} />

      </Router>

    )
  }
}

export default App;
