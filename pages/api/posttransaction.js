// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectDB from "@/middleware/mongoose";
import Order from "@/models/Order"
import Product from "@/models/Product";

const handler = async (req, res)=> {
  // Validate Paytm Checksum -- TODO
  // Update status into orders table after checking the transaction status
  let order,products;
  if(req.body.STATUS == 'TXN_SUCCESS'){
    order = await Order.findOneAndUpdate({orderId: req.body.ORDERID}, {status : 'Paid', paymentInfo: JSON.stringify(req.body)});
    products = order.products
    // Iterate over purchased products to update status of quantity
    for(let slug in products){
      await Product.findOneAndUpdate({slug: slug},{$inc :{"availableQty": - products[slug].qty}})
    }
  }
  else if(req.body.STATUS == 'PENDING'){
    order = await Order.findOneAndUpdate({orderId: req.body.ORDERID}, {status : 'Pending', paymentInfo: JSON.stringify(req.body)});
  }
  // Initiate Shipping
  // Redirect to the order confirmation page

    res.redirect('/order?id=' + order._id + '&clearCart=1',200);
    // res.status(200).json({ body: req.body });
  }
  
export default connectDB(handler);