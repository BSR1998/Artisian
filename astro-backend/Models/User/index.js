const mongoose = require("mongoose")
const { createHmac,randomBytes } = require('crypto');
const { type } = require("os");

const schema = new mongoose.Schema({
    fistName:{
        type:String,
        require: true
    },
    lastName:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    dob:{
        type:Date,
        require:true,
    },
    mobileNo:{
        type:Number,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    gender:{
        type:String,
        require:true
    },
    age:{
        type:Number,
        require:true
    },
    city:{
        type:String,
        require:true
    },
    state:{
        type:String,
        require:true
    },
    salt:{
        type:String
    }


})

schema.static("checkUser",function(next) {


    return next()
})


schema.pre('save',function(next) {

    const user = this
    const hashSalt  = randomBytes(16).toString();
    const hash = createHmac('sha256', hashSalt)
    .update(user.password)
    .digest('hex');
    this.password = hash
    this.salt = hashSalt
   return next()
})
const userModel = mongoose.model("user",schema)


module.exports = userModel