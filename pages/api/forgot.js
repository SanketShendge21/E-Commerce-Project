import connectDB from "@/middleware/mongoose";
import ForgotPassword from "@/models/ForgotPassword";
import User from "@/models/User";
import emailjs, { EmailJSResponseStatus } from "@emailjs/nodejs";
var CryptoJS = require("crypto-js");

const handler = async (req, res) => {
	try {
		if (req.body.sendMail) {
			// Generate a random token
			var rand = function () {
				return Math.random().toString(36).substr(2); // remove `0.`
			};

			var generateToken = function () {
				return rand() + rand(); // to make it longer
			};

			// Check if the user exists in the database
			// Send email to the user

			let token = generateToken();

			let user = await User.findOne({ email: req.body.email });
			let userInForgot = await ForgotPassword.findOne({ email: req.body.email });
			if (userInForgot.email == req.body.email) {
				await ForgotPassword.findOneAndUpdate({ email: req.body.email }, { token: token });
			} else {
				let forgot = new ForgotPassword({
					name: user.name,
					reply_to: user.email,
					email: req.body.email,
					token: token,
				});
				await forgot.save();
			}
			let email = `
			Hi ${user.name},
			
			There was a request to change your password on ThreadsUnveiled.com
			
			If you did not make this request then please ignore this email.
			
			Otherwise, please click this link to change your password: `
			let link = `http://localhost:3000/forgotpassword?token=${token}`
			const templateParams = {
				to_name: user.name,
				from_name: "ThreadsUnveiled.com",
				message: email,
				to_email: req.body.email,
				link: link
			};

			emailjs.init({
				publicKey: process.env.EMAILJS_PUBLIC_KEY,
				privateKey: process.env.EMAILJS_PRIVATE_KEY,
			});

			let response = await emailjs.send(process.env.EMAILJS_SERVICE_ID, process.env.EMAILJS_TEMPLATE_ID, templateParams);
			if (response.status == 200) {
				res.status(200).json({ success: true, token:token });
				return;
			} else {
				res.status(400).json({ success: false, message: response.error });
				return;
			}
			// res.status(200).json({ success: true, email, templateParams });

			// else if resetPassword
		} else {
			const { email, password, token } = req.body;
			let forgot = await ForgotPassword.findOne({email : email})
			if(!(forgot.token == token)) {
				res.status(400).json({ success:false })
				return;
			}
			else{
				const encPass = CryptoJS.AES.encrypt(password, process.env.AES_SECRET).toString();
				await User.findOneAndUpdate({email:email},{password:encPass});
				res.status(200).json({ success:true });
			}
		}
	} catch (error) {
		res.status(400).json({ success: false, message: error.message });
	}
};

export default connectDB(handler);
