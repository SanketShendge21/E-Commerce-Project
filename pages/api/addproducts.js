// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Product from "@/models/Product"; // import product model
import connectDB from "@/middleware/mongoose"; // import mongoose middleware

const handler = async (req, res) =>{    
    if(req.method == "POST"){

        // Creating a new Product object which takes the following parameters
        // We ahve to add products in loop because there can be multiple products

        for(let i=0; i<req.body.length; i++){
        let p = new Product({
            title :req.body[i].title,
            slug :req.body[i].slug, 
            desc : req.body[i].desc,
            img : req.body[i].img,
            category : req.body[i].category,
            size : req.body[i].size,
            color : req.body[i].color,
            price : req.body[i].price,
            availableQty : req.body[i].availableQty,
        });
        await p.save(); // save the new Product object
    }
        res.status(200).json({success: "Products created successfully"});
    }
    else{
        res.status(400).json({ error : "This method is not allowed" });    
    }
}

export default connectDB(handler);
  