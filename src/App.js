import React, { Component } from 'react';
import './App.css';
import DataTracker from './components/data-tracker/DataTracker';
import Navbar from './components/navbar/Navbar';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar/>
        <DataTracker/>
      </div>
    );
  }
}

export default App;
