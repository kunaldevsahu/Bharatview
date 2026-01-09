const mongoose = require("mongoose")

async function connectDB() {
  try{
    await mongoose.connect(process.env.MONGO_URI)
    console.log("MongoDB is connected ")

  }catch(error){
    console.log("Error in MongoDB connection:",error)

  }
  
}
module.exports = connectDB