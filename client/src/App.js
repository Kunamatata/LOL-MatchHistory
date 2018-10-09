import React, { Component } from 'react';

import MatchHistory from './Components/MatchHistory/matchhistory';
import './App.css';


class App extends Component {
  render() {
    return (
      <div className="app">
        <div className="match-history">
          <MatchHistory />
        </div>
      </div>
    );
  }
}

export default App;
