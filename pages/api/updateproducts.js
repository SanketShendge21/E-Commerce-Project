// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Product from "@/models/Product"; // import product model
import connectDB from "@/middleware/mongoose"; // import mongoose middleware

const handler = async (req, res) => {
	// try {
	if (req.method == "PUT") {
		const { title, category, desc, price, availableQty, size, color, slug, _id } = req.body;
        let p = await Product.findByIdAndUpdate(_id, {
            $set: {
                title: title,
                category: category,
                price: price,
                desc:desc,
                slug: slug,
                availableQty: availableQty,
                size: size,
                color: color,
            },
        }, { new: true });
         // Update the product take id
		if (p._id) {
			res.status(200).json({ success: true, message: "Product updated successfully" });
            return
		} else {
			res.status(400).json({ success: false, message: "Not able to update product" });
            return
		}
	}

	if (req.method == "POST") {
		let p = await Product.findOne({ _id: req.body.productId });
		if (p) {
			res.status(200).json({ success: true, product: p });
            return
		} else {
			res.status(400).json({ success: false, message: "Product not found" });
            return
        }
	}
	// } catch (error) {
	//     console.log(error.message);
	//     res.status(400).json({ success: false, message: "Product not found" });
	// }
};

export default connectDB(handler);
