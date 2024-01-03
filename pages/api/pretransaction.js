import connectDB from "@/middleware/mongoose";
import Order from "@/models/Order";
import Product from "@/models/Product";
const https = require("https");
const PaytmChecksum = require("paytmchecksum");

// const PaytmChecksum = require(PaytmChecksum)//


const handler = async (req, res)=> {
	if (req.method === "POST") {
		// Check if the details are valid
		let product,sum=0;
		let tampCart = req.body.cart;
		let success = false;
		// Check if cart is tampered 
		for(let item in tampCart){
			sum += tampCart[item].price * tampCart[item].qty

			// Check if cart items are out of stock -- TODO
			product = await Product.findOne({slug: item})
			if(product.availableQty < tampCart[item].qty){
				res.status(400).json({success: false, "error":"Some items in your cart went out of stock. Please try again"})
				return;
			}
			if(product.price !== tampCart[item].price) {
				res.status(400).json({success: false, "error":"The price of some items in your cart is incorrect. Please try again"})
				return;
			}
		}
		if(sum !== req.body.subTotal){
			res.status(400).json({success: false, "error":"The price of some items in your cart is incorrect. Please try again"})
			return;
		}



		//Inititate an order corresponding to the orderID

		// Insert an entry in the orders table with status as pending

		const { subTotal, cart, email, address, oid } = req.body;

		let order = new Order({
			email: email,
			orderId: oid,
			address: address,
			amount: subTotal,
			products: cart,
		});

		await order.save();

		var params = {};
		params.body = {
			requestType: "Payment",
			mid: process.env.NEXT_PUBLIC_PAYTM_MID,
			websiteName: "YOUR_WEBSITE_NAME", // TODO: this add the website name here
			orderId: oid,
			callbackUrl: `${process.env.NEXT_PUBLIC_HOST}/api/posttransaction`,
			txnAmount: {
				value: subTotal,
				currency: "INR",
			},
			userInfo: {
				custId: email,
			},
		};

		// const checksum = await PaytmChecksum.generateSignature(JSON.stringify(params), process.env.PAYTM_MKEY);
		// 	let paytmParams = { ...params, CHECKSUMHASH: checksum };
		// 	console.log(paytmParams);
		const checksum = await PaytmChecksum.generateSignature(JSON.stringify(params.body), process.env.PAYTM_MKEY); // TODO: add key in env once we get from paytm
		params.head = {
			signature: checksum,
		};

		var post_data = JSON.stringify(params);
		console.log(post_data);
		// It should be bloacking function so we are not using async instead we use promises
		const requestAsync = () => {
			try {
				return new Promise((resolve, reject) => {
					var options = {
						/* for Staging */
						//hostname: "securegw-stage.paytm.in" /* for Production */,
						hostname: "securegw.paytm.in",

						port: 443,
						path: `/theia/api/v1/initiateTransaction?mid=${process.env.NEXT_PUBLIC_PAYTM_MID}&orderId=${req.body.oid}`,
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							"Content-Length": post_data.length,
						},
					};

					var response = "";
					var post_req = https.request(options, function (post_res) {
						post_res.on("data", function (chunk) {
							response += chunk;
						});

						post_res.on("end", function () {
							console.log("Response: ", response);
							let ress = JSON.parse(response).body;
							ress.success = true;
							resolve(ress)
						});
					});

					post_req.write(post_data);
					post_req.end();
				});
			} catch (err) {
				console.log("Error: ", err);
			}
		};

		let myResponse = await requestAsync();
		res.status(200).json(myResponse);
	}
}

export default connectDB(handler);