import React, { Component } from "react";
import Match from "../Match/match";
import Search from "../Search/search";
import RegionSelector from "../RegionSelector/regionselector";

import "./matchhistory.css";

import { withRouter } from "react-router-dom";

class MatchHistory extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      error: false,
      server: this.defaultServer
    };

    this.defaultServer = "euw";
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getSummonerData = this.getSummonerData.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.setState({ server: this.props.server });
    this.getSummonerData({
      username: this.props.summonerName || "Dowdow",
      server: this.props.server
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { username, server } = this.state;
    this.getSummonerData({
      username,
      server
    });
    this.setState({ username, server });
    this.props.history.push(`/${server}/${username}`);
  }

  onChange(e) {
    this.setState({ server: e.target.value });
  }

  getSummonerData({ username, server }) {
    server = server ? server : this.defaultServer;
    this.setState(Object.assign({}, this.state, { loading: true }));
    fetch(`/summoner/${server}/${decodeURI(username)}`)
      .then(data => {
        return data.json();
      })
      .then(matches => {
        this.setState(Object.assign({}, matches, { loading: false }));
      });
  }

  handleChange(e) {
    this.setState({ username: e.target.value });
  }

  render() {
    const { loading, matches } = this.state;
    if (loading) {
      return <div className="loader" />;
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
          <RegionSelector onChange={this.onChange} />
          {matches.map((match, index) => {
            return <Match match={match} key={index} />;
          })}
        </div>
      );
    } else {
      return <div>No matches</div>;
    }

    if (matches.error) {
      return <div>Error</div>;
    }
  }
}

export default withRouter(MatchHistory);
