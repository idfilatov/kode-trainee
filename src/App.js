import React, { Component, } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import './App.css';
import WorkersListPage from './components/WorkersListPage';
import WorkerDetailsPage from './components/WorkerDetailsPage';

class App extends Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route path='/' exact element={<WorkersListPage />} />
          <Route path='/:worker_id' element={<WorkerDetailsPage />} />
        </Routes>
      </Router>

    )
  }
}

export default App;
