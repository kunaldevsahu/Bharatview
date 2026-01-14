const mongoose = require("mongoose")

async function connectDB() {
  try{
    if (!process.env.MONGO_URI) {
      console.log("Error: MONGO_URI is not defined in .env file")
      console.log("Please create a .env file in the backend directory with:")
      console.log("MONGO_URI=your_mongodb_connection_string")
      console.log("PORT=3000")
      return
    }
    await mongoose.connect(process.env.MONGO_URI)
    console.log("MongoDB is connected ")

  }catch(error){
    console.log("Error in MongoDB connection:",error.message)

  }
  
}
module.exports = connectDB