const {Router } = require("express");
const { requireAuth, cache, validateIP } = require("../middlewares/auth");
const {   currentLocation,getIPInfo} = require("../controllers/search.controllers");
const redisLimiter = require("../middlewares/redisLimiter");

const searchRouter = Router();

searchRouter.get("/currentLocation",currentLocation)
searchRouter.get("/ip/:ip", requireAuth, cache, validateIP ,getIPInfo);

module.exports = {searchRouter};