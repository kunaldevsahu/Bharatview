const connectDB = require("./config/db")
const app = require("./app")
const dotenv = require("dotenv")
const path = require("path")
dotenv.config({ path: path.join(__dirname, "../.env") })
const PORT = process.env.PORT || 3000
connectDB()

app.get("/",(req,res)=>{
  res.send("Hello users")
})

app.listen(PORT,()=>{
  console.log(`Server is running on port : ${PORT}`)
})

