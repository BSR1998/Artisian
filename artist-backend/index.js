const express = require("express")
const {connectToDatabase} = require("./Database/connection")
const userRouter = require("./Routes/User/index")
const cors = require('cors');
const app = express()
const cookieParser = require("cookie-parser")
const PORT = 8000
const {verifyUser} = require("./Middleware/index")
const path = require("path")

// Middleware 
app.use(cors({ origin: 'http://localhost:5173', 
credentials: true, }));
app.use(cookieParser())
app.use(verifyUser())
app.use(express.urlencoded({require:false}))
app.use(express.json())
app.use(express.static("./static"))

connectToDatabase()

app.get("/",(req,res) => {
    return res.status(200).json({msh:"Welcome"})
})
app.use("/user",userRouter)

app.listen(PORT,()=>console.log(`Server started at ${PORT}`))