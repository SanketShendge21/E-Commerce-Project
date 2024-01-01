// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectDB from "@/middleware/mongoose";
import Order from "@/models/Order"

const handler = async (req, res)=> {
  // Validate Paytm Checksum -- TODO
  // Update status into orders table after checking the transaction status

  if(req.body.STATUS == 'TXN_SUCCESS'){
    var order = await Order.findOneAndUpdate({orderId: req.body.ORDERID}, {status : 'Paid', paymentInfo: JSON.stringify(req.body)});
  }
  else if(req.body.STATUS == 'PENDING'){
    var order = await Order.findOneAndUpdate({orderId: req.body.ORDERID}, {status : 'Pending', paymentInfo: JSON.stringify(req.body)});
  }
  // Initiate Shipping
  // Redirect to the order confirmation page

    res.redirect('/order?id=?'+order._id,200);
    // res.status(200).json({ body: req.body });
  }
  
export default connectDB(handler);