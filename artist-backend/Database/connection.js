const mongoose = require("mongoose")

 const connectToDatabase= ()=>{
    mongoose.connect("mongodb://localhost:27017/atist").then((res)=>{
        console.log("Connected to database ")
    }).catch((err)=>{
        console.log("Not Connected to database ",err)
    })
}

module.exports = {connectToDatabase}