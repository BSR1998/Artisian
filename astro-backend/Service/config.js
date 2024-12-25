
const secretKey = "#45Demon!24w"

var jwt = require('jsonwebtoken');


const getToken = async(user)=> {

    let payload = {
        _id:user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
    }

   let token =  jwt.sign(payload,secretKey) 
   return token
}

const verifyToken = (token)=> {

    const user = jwt.verify(token,secretKey)
    return user

}


module.exports = {
    getToken,
    verifyToken
}