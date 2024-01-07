import connectDB from "@/middleware/mongoose";
import User from "@/models/User";
var jwt = require("jsonwebtoken");

const handler = async (req, res) => {
	try {
		if (req.method === "POST") {
			let token = req.body.token;
			let user = jwt.verify(token, process.env.JWT_SECRET);
			let dbuser = await User.findOne({ email: user.email });
			const { name, address, pincode, phone } = dbuser;
			res.status(200).json({ success: true, name, address, phone, pincode });
		} else {
			res.status(400).json({ error: "error" });
		}
	} catch (err) {
		res.status(400).json({ error: err });
	}
};

export default connectDB(handler);
