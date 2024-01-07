import connectDB from "@/middleware/mongoose";
import User from "@/models/User";
var jwt = require("jsonwebtoken");

const handler = async (req, res) => {
	try {
		if (req.method === "PUT") {
			let token = req.body.token;
			let user = jwt.verify(token, process.env.JWT_SECRET);
			const { name, address, pincode, phone } = req.body;
			let dbuser = await User.findOneAndUpdate({ email: user.email }, { name: name, pincode: pincode, address: address, phone: phone });
			res.status(200).json({ success: true, user: dbuser });
		}
		else{
			res.status(400).json({ error: "error" });
		}
	} catch (err) {
		res.status(400).json({ error: "Bad Request" });
	}
};

export default connectDB(handler);
