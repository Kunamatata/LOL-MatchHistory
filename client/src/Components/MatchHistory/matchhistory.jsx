import React, { Component } from "react";
import Match from "../Match/match";
import Search from "../Search/search";

import './matchhistory.css'

class MatchHistory extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      error: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getSummonerData = this.getSummonerData.bind(this);
  }

  componentDidMount() {
    this.getSummonerData("Dowdow");
  }

  handleSubmit(e) {
    e.preventDefault();
    this.getSummonerData(this.state.value);
  }

  getSummonerData(username) {
    this.setState(Object.assign({}, this.state, { loading: true }));
    fetch(`http://localhost:3001/summoner/${username}`)
      .then(data => {
        return data.json();
      })
      .then(matches => {
        console.log(matches);
        this.setState(Object.assign({}, matches, { loading: false }));
      });
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  render() {
    const { loading, matches } = this.state;
    if(loading){
        return (<div className="loader"></div>)
    }
    if (matches) {
      return (
        <div>
          <Search
            data={this.state.jobs}
            placeholder="Summoner Name"
            handleSubmit={this.handleSubmit}
            handleChange={this.handleChange}
          />
          {matches.map((match, index) => {
            return <Match match={match} key={index} />;
          })}
        </div>
      );
      if(matches.error){
          return (<div>Error</div>)
      }
    } else {
      return <div>Ok</div>;
    }
  }
}

export default MatchHistory;
