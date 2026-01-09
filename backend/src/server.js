const connectDB = require("./config/db")
const app = require("./app")
const dotenv = require("dotenv")
dotenv.config()
const PORT = process.env.PORT || 3000
connectDB()

dotenv.config

app.get("/",(req,res)=>{
  res.send("Hello users")
})

app.listen(PORT,()=>{
  console.log(`Server is running on port : ${PORT}`)
})

