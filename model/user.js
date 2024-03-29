const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email : {
        type: String,
        required:true,
        unique: true
    },
    password : {
        type: String,
        required: true
    },
    name : {
        type: String,
        required: true,
    },
    secret : {
        type: String
    }
},{
    timestamps: true
})


const User = mongoose.model('User',userSchema);  //telling mogoose that this is model or schema

module.exports = User;