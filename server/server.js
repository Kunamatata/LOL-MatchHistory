const express = require('express');
const helpers = require('./helpers.js');
const RedisManager = require('./Database/RedisManager');
const workers = require('./workers/getChampions');

const app = express();

let champions;
let redis = new RedisManager();
redis.connectRedis();
workers.setChampionCache(redis)
redis.getCache('champions').then(data => {
  champions = data;
});


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get("/summoner/:username", (req, res) => {
  const { username } = req.params;
  if (username) {
    redis.getCache(username).then(data => {
      if (data)
        return res.send(data);
      else {
        let matchArray = [];
        helpers.getSummonerByName(username).then(data => {
          data.matches.forEach(match => {
            let result;
            let participantID;
            match.participantIdentities.forEach((participant) => {
              if (participant.player.summonerId === data.summonerId) {
                participantID = participant.participantId;
              }
            });

            match.participants.forEach((participant) => {
              if (participant.participantId === participantID) {
                let { stats } = participant;

                matchArray.push({
                  gameDuration: match.gameDuration,
                  gameCreation: match.gameCreation,
                  stats,
                  championImage: `http://ddragon.leagueoflegends.com/cdn/6.24.1/img/champion/${champions[participant.championId]}.png`,
                  champion: champions[participant.championId],
                })
              }
            });
          });
          redis.setCache(username, { matches: matchArray });
          res.send({ matches: matchArray });
        }).catch(e => {
          console.log(e);
          res.send({error: "No data for that summoner"});
        })
      }
    }).catch(e => { console.log(e) });
  } else {
    res.sendStatus({ error: "Please specify a username" });
  }
})

app.get("/champions", (req, res) => {
  redis.getCache('champions').then(data => {
    res.send(data)
  });
})

app.listen(3001);

module.exports = app;