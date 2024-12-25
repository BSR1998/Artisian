
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
        lastName,
        email
      };
  
      const token = await getToken(obj);
  
      console.log("TOKEN ", token);
  
      return res.cookie("uid", token, { httpOnly: true, secure: false, sameSite: "Lax" }).status(200).json(result);
    } catch (err) {
      console.error("Error:", err);
      return res.status(500).send("Server error");
    }
  };
  

const userLogin = async(req,res) =>{

    
}

module.exports = {
    userRegister,
    userLogin
}