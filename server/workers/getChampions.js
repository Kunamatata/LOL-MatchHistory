const helpers = require('../helpers');

/**
 * 
 * @param {Redis} redis The redis instance to cache the static champions list
 */
async function setChampionCache(redis) {
  try {
    const champions = await helpers.getChampions();
    redis.setCache('champions', champions);
  } catch (e) {
    throw new Error(e);
  }

}

module.exports = {
  setChampionCache
};