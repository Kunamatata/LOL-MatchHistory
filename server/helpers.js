require('dotenv').config();

const axios = require('axios');
const { Kayn, REGIONS } = require('kayn');
const kayn = Kayn(process.env.RIOT_API)();
const championListURL = 'https://ddragon.leagueoflegends.com/cdn/6.24.1/data/en_US/champion.json';

/**
 * Get the last 5 matches of the summoner
 * @param {String} username The username of the summoner
 */
async function getSummonerByName({username, server}) {
  try {
    const summoner = await kayn.Summoner.by.name(username).region(REGIONS.EUROPE_WEST);
    const matchlist = await kayn.Matchlist.by.accountID(summoner.accountId).region(REGIONS.EUROPE_WEST);
    let asyncMatches = [];

    for (let i = 0; i < 5; i++) {
      if (matchlist.matches[i]) {
        let match = kayn.Match.get(matchlist.matches[i].gameId).region(server);
        asyncMatches.push(match);
      }
    }

    let matches = await Promise.all(asyncMatches);

    return { summonerId: summoner.id, matches: matches };
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }

}

/**
 * Get the static list of champions from League of Legends
 */
async function getChampions() {
  try {
    const champions = await axios.get(championListURL);
    let obj = {}

    for (const champion in champions.data.data) {
      let { id, key } = champions.data.data[champion];
      obj[key] = id;
    }

    return obj;
  } catch (e) {
    throw new Error(e);
  }

}

module.exports = {
  getSummonerByName,
  getChampions,
}