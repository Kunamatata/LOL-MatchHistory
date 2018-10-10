import React, { Component } from 'react';

import MatchHistory from './Components/MatchHistory/matchhistory';
import './App.css';


class App extends Component {
  render() {
    const {summonerName, server} = this.props.match.params;
    return (
      <div className="app">
        <div className="match-history">
          <MatchHistory server={server} summonerName={summonerName} />
        </div>
      </div>
    );
  }
}

export default App;
