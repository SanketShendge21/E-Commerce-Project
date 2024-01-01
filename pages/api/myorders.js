import connectDB from "@/middleware/mongoose"
import Order from "@/models/Order";
var jwt = require('jsonwebtoken');
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const handler = async (req, res)=> {
    try {
      if(req.method === 'POST'){
        const token = req.body.token;
        const data = jwt.verify(token,process.env.JWT_SECRET)
        let orders = await Order.find({email: data.email});
        res.status(200).json({orders})
      }  
    } catch (error) {
        console.error(error);
    }
}

export default connectDB(handler);