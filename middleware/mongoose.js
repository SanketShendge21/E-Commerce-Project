import mongoose from "mongoose";

const connectDB =  handler  => async (req,res)=>{

    //if connection is already established then reutrn the connection
    if(mongoose.connections[0].readyState){
        return handler(req,res)
    }

    // if no connection is available connect to the server and return 
    await mongoose.connect(process.env.MONGO_URI);
    return handler(req,res)
}

export default connectDB;