import React, { Component, } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import './App.css';
import MainPage from './components/MainPage';
import WorkerDetailsPage from './components/WorkerDetailsPage';

class App extends Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route path='/' exact element={<MainPage />} />
          <Route path='/:worker_id' element={<WorkerDetailsPage />} />
        </Routes>
      </Router>

    )
  }
}

export default App;
