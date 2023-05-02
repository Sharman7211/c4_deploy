const {Router } = require("express");
const {  loginUser,
    logoutUser } = require("../controllers/user.controllers");
const { requireAuth, cache, validateIP  } = require("../middlewares/auth");

const userRouter = Router();

userRouter.post("/login",loginUser);

userRouter.get("/logout",requireAuth, cache, validateIP, logoutUser);


module.exports = {userRouter};
