
const UserModel = require("../../Models/User/index")

const {getToken} = require("../../Service/config")

const userRegister = async (req, res) => {
    const { firstName, lastName, mobileNo, email, password, age, gender, city, state } = req.body;
  
    console.log("req.body ", req.body);
    
    try {
      const result = await UserModel.create({
        firstName,
        lastName,
        mobileNo,
        email,
        password,
        age,
        gender,
        city,
        state
      });
  
      const obj = {
        _id: result._id,
        firstName,
        email
      };
  
      const token = await getToken(obj);
  
      console.log("TOKEN ", result);
  
      return res.cookie("uid", token, { httpOnly: true, secure: false, sameSite: "Lax" })
      .status(200)
      .json({user: {
        id: result._id,
        username: result.firstName,
        email: result.email,
        token: token
      }});
    } catch (err) {
      console.error("Error:", err);
      return res.status(500).send("Server error");
    }
  };
  

const userLogin = async(req,res) =>{

  const {email,password} = req.body
   let user = await UserModel.checkUser({email,password})
   if(user) {

    const obj = {
      _id: user._id,
      firstName: user.firstName,
      email
    };
    const token = await getToken(obj);
      return res.cookie("uid", token, { httpOnly: true, secure: false, sameSite: "Lax" })
      .status(200)
      .json({user: {
        id: user._id,
        username: user.firstName,
        email: user.email,
        token: token
      }})
   } else {
    return res.status(400).json({err:"Something went wrong"})
   }

    
}

const userProfile = async(req,res) => {
  return res.status(200).json({msg:"Image Stored"})
}

module.exports = {
    userRegister,
    userLogin,
    userProfile
}