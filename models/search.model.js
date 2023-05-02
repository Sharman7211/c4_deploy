
const mongoose= require("mongoose")

const searchSchema= mongoose.Schema({
    ip:{
        type:String,
        required:true,
        
    },
    city:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default : Date.now,
        expires:'6h'
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
});

const Search= mongoose.model('Search',searchSchema);

module.exports={
    Search
}