require('dotenv').config();

const redisClient = require('redis');

class RedisManager {
  constructor() {
    this.redis = null;
  }

  /**
   * Connects to redis
   */
  connectRedis() {
    return new Promise((resolve, reject) => {
      this.redis = redisClient.createClient(6379, process.env.REDIS);

      this.redis.once('connect', data => {
        console.log('Redis connection established');
        if (process.env)
          this.redis.flushall();
        return resolve();
      })

      this.redis.once('error',
        err => reject(new Error(err)));
    })
  }

  /**
   * 
   * @param {String} key The key for the cache
   * @param {Object} document JSON object to cache
   */
  setCache(key, document) {
    console.log('Setting a redis cache for key: ' + key);
    this.redis.set(key, JSON.stringify(document));
  }

  /**
   * 
   * @param {Object} key The key for the cache that is the username and the server
   * @param {Object} document JSON object to cache
   */
  setPlayerCache(key, document) {
    const { username, server } = key;
    if (username && server) {
      console.log(`${username}-${server}`)
      console.log(`Setting a redis cache for key: ${username}-${server}`);
      this.redis.set(`${username}-${server}`, JSON.stringify(document));
    }
  }

  /**
   * 
   * @param {Object} key The key for the cache that is the username and the server
   * @returns {Promise} returns a promise containing the value of the cache
   */
  getPlayerCache(key) {
    const { username, server } = key;
    if (username && server) {
      return new Promise((resolve, reject) => {
        console.log(`${username}-${server}`)
        this.redis.get(`${username}-${server}`, (err, value) => {
          if (err)
            return reject(new Error(err));
          return resolve(JSON.parse(value));
        })
      })
    }
    throw new Error('You must specify a key for redis');
  }

  /**
   * 
   * @param {String} key The key to get the cache data from
   * @returns {Promise} returns a promise containing the value of the cache
   */
  getCache(key) {
    if (key)
      return new Promise((resolve, reject) => {
        this.redis.get(key, (err, value) => {
          if (err)
            return reject(new Error(err));
          return resolve(JSON.parse(value));
        })
      })
    throw new Error('You must specify a key for redis');
  }
}

module.exports = RedisManager;