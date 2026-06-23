import mongoose from "mongoose";


const MONGODB_URL = process.env.MONGODB_URL||"mongodb://127.0.0.1:27017/next_crud"
if(!MONGODB_URL) {
    throw new Error("MONGODB_URL invalid")
}

 let isConnected:any=false;
 async function connectDB() {
    if(isConnected) return;
    try{
      const db = await mongoose.connect(MONGODB_URL)
      isConnected = db.connections[0].readyState
      console.log("mongodb is connected");
    }catch(err){
        console.log(err);
    }
    
 }

 export default connectDB;