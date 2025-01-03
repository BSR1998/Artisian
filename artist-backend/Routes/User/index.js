
const express = require("express")

const {userLogin,userRegister} = require("../../Controllers/User/index")



const user = express.Router()

user.post("/login",userLogin)
user.post("/register",userRegister)


module.exports = user


