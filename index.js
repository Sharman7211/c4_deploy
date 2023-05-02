const express= require("express")

const app= express()

const {connection}= requitre("./db")
const { userRouter } = require("./routes/user.route");
const {searchRouter }= require("./routes/search.route");
const {redisClient} = require("./helpers/redis");

const logger = require("./middlewares/logger");

require("dotenv").config()

app.use(express.json())

app.get("/", async(req,res)=>{
    res.send(await redisClient.get("name"));
})

app.use("/api/user",userRouter)

app.use("/api/search",searchRouter);


app.listen(process.env.port,async()=>{
    try{
        await connection 
        console.log("Connected to DB")

    }catch(err){
        console.log("Cannot connect to DB")
        console.log(err.message)
        
    }
    console.log(`Server running at ${process.env.port}`)
})