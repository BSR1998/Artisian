const express = require("express")
const {connectToDatabase} = require("./Database/connection")
const userRouter = require("./Routes/User/index")
const cors = require('cors');
const app = express()
const cookieParser = require("cookie-parser")
const PORT = 8000
const {verifyUser} = require("./Middleware/index")

// Middleware 
app.use(cookieParser())
app.use(verifyUser())
app.use(cors({ origin: 'http://localhost:5173', 
credentials: true, }));
app.use(express.urlencoded({require:false}))
app.use(express.json())

connectToDatabase()

app.get("/",(req,res) =>{
    console.log("Helo")
    return res.status(200).json({msg:"welcom"})
})

app.use("/user",userRouter)

app.listen(PORT,()=>console.log(`Server started at ${PORT}`))