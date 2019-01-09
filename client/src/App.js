import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './components/Home'
import Stats from './components/Stats'
import Header from './components/layout/Header'

import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header />
            <Route exact path="/" component={Home} />
            <Route exact path="/stats" component={Stats} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
