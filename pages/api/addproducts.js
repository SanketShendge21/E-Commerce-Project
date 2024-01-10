// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Product from "@/models/Product"; // import product model
import connectDB from "@/middleware/mongoose"; // import mongoose middleware

const handler = async (req, res) => {
	// try {
	if (req.method == "POST") {
		// Creating a new Product object which takes the following parameters
		// We ahve to add products in loop because there can be multiple products
		console.log(req.body);

		let p = new Product({
			title: req.body.title,
			slug: req.body.slug,
			desc: req.body.description,
			img: req.body.img,
			category: req.body.category,
			size: req.body.size,
			color: req.body.color,
			price: req.body.price,
			availableQty: req.body.availableQty,
		});
		let product = await p.save(); // save the new Product object

		if (product) {
			res.status(200).json({ success: true, message: "Products added successfully" });
		}
        else {
            res.status(400).json({ success: false, message: "Error adding product" });
        }
	} else {
		res.status(400).json({ success: false, message: "This method is not allowed" });
	}
	// } catch (error) {
	// 	res.status(400).json({ success:false,error: "This method is not allowed" });
	// 	console.log(error.message);
	// }
};

export default connectDB(handler);
