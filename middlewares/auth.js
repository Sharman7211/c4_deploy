const jwt = require("jsonwebtoken");
const redisClient = require("../helpers/redis");

const jwt = require('jsonwebtoken');
const { checkCache, cacheResponse } = require('./redis');
const { validationResult } = require('express-validator');

const requireAuth = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
    if (err) return res.status(401).json({ message: 'Unauthorized' });
    req.user = decodedToken;
    next();
  });
};

const cache = async (req, res, next) => {
  const { ip } = req.params;
  const data = await checkCache(ip);
  if (data !== null) return res.status(200).json({ city: data });
  next();
};

const validateIP = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: 'Invalid IP address' });
  }
  next();
};

module.exports = { requireAuth, cache, validateIP };
