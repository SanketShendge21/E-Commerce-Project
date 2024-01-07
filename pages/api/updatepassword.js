import connectDB from "@/middleware/mongoose";
import User from "@/models/User";
var CryptoJS = require("crypto-js");
var jwt = require("jsonwebtoken");

const handler = async (req, res) => {
	try {
		if (req.method === "PUT") {
			let token = req.body.token;
			let user = jwt.verify(token, process.env.JWT_SECRET);
			const { password, confirm_password, current_password } = req.body;
            let pass = await User.findOne({email: user.email})
			const bytes = CryptoJS.AES.decrypt(pass.password, process.env.AES_SECRET);
			let decryptedPass = bytes.toString(CryptoJS.enc.Utf8);
			if(decryptedPass != current_password){
                res.status(400).json({ success: false, error: "Error Updating Password" });
                return;
            }
			if (password == confirm_password) {
				// Encrypt the password
				const encPass = CryptoJS.AES.encrypt(password, process.env.AES_SECRET).toString();
				let dbuser = await User.findOneAndUpdate({ email: user.email }, { password: encPass });
				res.status(200).json({ success: true});
                return;
			} else {
				res.status(400).json({ success: false, error: "Error Updating Password" });
			}
		}
	} catch (err) {
		res.status(400).json({ success: false, error: err.message });
	}
};

export default connectDB(handler);
