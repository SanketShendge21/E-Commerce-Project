// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import connectDB from "@/middleware/mongoose";
import User from "@/models/User"

const handler = async (req, res) => {
    try {
        if(req.method == 'POST'){
            console.log(req.body);
            let u = new User(req.body); // Create a new user object
            u.save(); // Save the user object
            res.status(200).json({success:"success"})
        }   
    else{
        res.status(500).json({error:"error"})
    }
        
    } catch (error) {
        res.status(500).json(error)
    }

}
  
export default handler;