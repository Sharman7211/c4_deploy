const redis = require('redis');

// create Redis client
const redisClient = redis.createClient(process.env.REDIS_URL);

// set key-value pair in Redis cache with a 6 hour expiration
const cacheResponse = (key, value) => {
  redisClient.setex(key, 6 * 60 * 60, value);
};

// check if key exists in Redis cache
const checkCache = (key) => {
  return new Promise((resolve, reject) => {
    redisClient.get(key, (err, data) => {
      if (err) reject(err);
      if (data !== null) resolve(data);
      else resolve(null);
    });
  });
};

module.exports = { cacheResponse, checkCache };
