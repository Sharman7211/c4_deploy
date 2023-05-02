const mongoose= require("mongoose")

const userSchema= mongoose.Schema({
    username: {
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    searches:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Search'
    }]
})
const User= mongoose.model('User', userSchema)

module.exports={
    User
}
