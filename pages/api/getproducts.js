// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Product from "@/models/Product"; // import product model
import connectDB from "@/middleware/mongoose"; // import mongoose middleware

const handler = async (req, res, next) =>{
    
    let products = await Product.find();
    res.status(200).json({ products });
}

export default connectDB(handler);
  