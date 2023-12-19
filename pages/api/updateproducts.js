// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Product from "@/models/Product"; // import product model
import connectDB from "@/middleware/mongoose"; // import mongoose middleware

const handler = async (req, res) =>{    
    if(req.method == "PUT"){

        // Creating a new Product object which takes the following parameters
        // We ahve to add products in loop because there can be multiple products

        for(let i=0; i<req.body.length; i++){
        let p = await Product.findByIdAndUpdate(req.body[i]._id,req.body[i]) // Update th e product take id 
        }
        res.status(200).json({success: "Product updated successfully"});
    }
    
    else {
        res.status(400).json({ error : "This method is not allowed" });    
    }
}

export default connectDB(handler);
  