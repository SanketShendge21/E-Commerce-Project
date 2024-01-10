import Admin from "@/models/Admin";
import connectDB from "@/middleware/mongoose";
var CryptoJS = require("crypto-js"); // Import crypto-js
var jwt = require('jsonwebtoken');


const handler = async (req, res) => {
    try {
        if (req.method === 'POST') {
            console.log(req.body);
            let admin = await Admin.findOne({ email: req.body.email }); // Find the admin in the database
            const bytes  = CryptoJS.AES.decrypt(admin.password, process.env.AES_SECRET);
            let decryptedPass = bytes.toString(CryptoJS.enc.Utf8);

            if (admin) {
                // if encrypted password and password in the database matches
                if (req.body.email === admin.email && req.body.password === decryptedPass) {
                    // If the admin exists and the credentials match, send a success response
                    
                    // Adding a JWT token for the admin to create a login session
                    var token = jwt.sign({ email: admin.email }, process.env.JWT_SECRET,{expiresIn: '2d'}); // expires in 2 days
                    res.status(200).json({success:true,token, email: admin.email});
                } else {
                    // If the credentials are invalid, send an error response
                    res.status(500).json({ success: false, error: "Invalid Credentials" });
                }
            } else {
                // If the admin is not found, send an error response
                res.status(500).json({ success: false, error: "Admin not found" });
            }
        } else {
            // If the request method is not POST, send an error response
            res.status(500).json({ error: "Error with your request" });
        }

    } catch (error) {
        // Handle other errors and send a generic error response
        res.status(500).json({ success: false, error: error.message });
    }
};

export default connectDB(handler);
