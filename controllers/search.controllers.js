const axios = require('axios');
const Search = require('../models/search');
const User = require('../models/user');
const { validationResult } = require('express-validator');
const { cacheResponse, checkCache } = require('../helpers/redis');


const currentLocation= async(req,res)=>{
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const cachedCity = await getAsync(ip);

  if (cachedCity) {
    return res.status(200).json({ city: cachedCity });
  }

  try {
    const { data } = await axios.get(`https://ipapi.co/${ip}/json/`);

    const ipInfo = new Ip({
      user: req.user._id,
      ipAddress: ip,
      city: data.city,
    });

    await ipInfo.save();

    redisClient.setex(ip, 6 * 60 * 60, data.city);

    return res.status(200).json({ city: data.city });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}



const getIPInfo = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ message: 'Invalid IP address' });
  }

  const { ip } = req.params;

  try {
    const cachedCity = await client.get(ip);

    if (cachedCity) {
      return res.status(200).json({ city: cachedCity });
    }

    const response = await axios.get(`https://ipapi.co/${ip}/json/`);
    const city = response.data.city;

    const search = new Search({ ip, city, user: req.user._id });
    await search.save();

    await User.findByIdAndUpdate(req.user._id, { $push: { searches: search._id } });

    client.set(ip, city, 'EX', 21600);

    res.status(200).json({ city });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  currentLocation,
  getIPInfo
};
