import React, { Component } from "react";
import "./match.css";

import moment from "moment";
import { statSync } from "fs";

const itemURL = "https://ddragon.leagueoflegends.com/cdn/8.19.1/img/item";

class Match extends Component {
  constructor() {
    super();
    this.state = {
      itemImages: []
    };
  }

  componentDidMount() {
    let { items } = this.props.match;
    let itemArray = [];
    items.forEach(item => {
      if (item !== 0)
        itemArray.push(
          fetch(`${itemURL}/${item}.png`).then(data => data.blob())
        );
    });
    Promise.all(itemArray).then(data => {
      data = data.map(blob => {
        if (blob.size >= 500) return URL.createObjectURL(blob);
      });
      this.setState({ itemImages: data });
      console.log(this.state);
    });
  }

  render() {
    let { match } = this.props;
    let { stats } = this.props.match;
    return (
      <div className={stats.win ? "match victory" : "match defeat"}>
        <div className="game-creation">
          <div className="summoner-name">{match.summonerName}</div>
          <div>Game played</div>
          {moment(new Date(match.gameCreation)).fromNow()}
        </div>

        <div className="champion-image">
          <img className="image" src={match.championImage} alt="champion" />
          <div className="champion-name">{match.champion}</div>
        </div>
        <div className="KDA">
          <span className="kills">{stats.kills}</span> /{" "}
          <span className="deaths"> {stats.deaths} </span> /{" "}
          <span className="assists"> {stats.assists}</span>
          <div>CS: {stats.totalMinionsKilled}</div>
          <div>Gold Earned: {stats.goldEarned}</div>
        </div>
        <div className="stats">
          <div className="level">Level {stats.champLevel}</div>
          <div className="game-duration">
            Game duration{" "}
            <div>
              <strong>
                {moment.duration(match.gameDuration, "seconds").humanize()}
              </strong>
            </div>
          </div>
        </div>
        <div className="items">
          {this.state.itemImages.map((item, index) => {
            if (item) return <img src={item} key={index} alt="item" />;
          })}
        </div>
      </div>
    );
  }
}

export default Match;
