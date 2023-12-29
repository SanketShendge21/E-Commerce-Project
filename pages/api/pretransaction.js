
const https = require("https");
const PaytmChecksum = require("paytmchecksum")

// const PaytmChecksum = require(PaytmChecksum)//

export default async function handler(req, res) {
	if (req.method === "POST") {
		const {subTotal, email, oid} = req.body
		var params = {};
		// Insert an entry in the orders table with status as pending
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
					var post_req = https.request(options, function(post_res) {
						post_res.on('data', function (chunk) {
							response += chunk;
						});
				
						post_res.on('end', function(){
							console.log('Response: ', response);
							resolve(JSON.parse(response).body);
						});
					});
				
					post_req.write(post_data);
					post_req.end();
					
				});	
			}
			catch (err) {
				console.log("Error: ", err);
			}
			
		};
		

		let myResponse = await requestAsync();
		res.status(200).json(myResponse);
	}
}
