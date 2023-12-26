import mongoose from "mongoose";

// const connectDB =  handler  => async (req,res)=>{

//     //if connection is already established then reutrn the connection
//     if(mongoose.connections[0].readyState){
//         return handler(req,res)
//     }

//     // if no connection is available connect to the server and return 
//     // await mongoose.connect(process.env.MONGO_URI); Why this environemnt variable dosent work idk
//     await mongoose.connect("mongodb://localhost:27017/threadsunveiled");
//     return handler(req,res)
// }

const connectDB = async()=>{
    try{
        let connection = await mongoose.connect(process.env.MONGO_URI)
        return connection;
    } catch(e){
        console.error(e);
    }

}

export default connectDB;