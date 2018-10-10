import React from "react";
import "./match.css";

import moment from 'moment';

function match({ match }) {
  let {stats} = match;
  return (
    <div className={stats.win ? "match victory" : "match defeat"}>
      {/* <div>{stats.win ? "Victory" : "Defeat"}</div> */}
      <div className="game-creation">{moment(new Date(match.gameCreation)).fromNow()}</div>

      <div className="champion-image">
        <img className="image" src={match.championImage} />
        <div className="champion-name">{match.champion}</div>
      </div>
      <div className="KDA">
        <span className="kills">{stats.kills}</span>  / <span className="deaths"> {stats.deaths} </span> / <span className="assists"> {stats.assists}</span>
      </div>
      <div className="stats">
        <div className="level">Level {stats.champLevel}</div>
        <div className="game-duration">{moment.duration(match.gameDuration, "seconds").humanize()}</div>
      </div>      
    </div>
  );
}

export default match;
