import connectDB from "@/middleware/mongoose";
import User from "@/models/User";
var CryptoJS = require("crypto-js");

const handler = async (req, res) => {
    try {
        let conn = await connectDB();
        if (req.method === 'POST') {
            const { name, email, password } = req.body;
            
            // Encrypt the password
            const encPass = CryptoJS.AES.encrypt(password, "secret123").toString();
            
            // Create a new user object with encrypted password
            let user = new User({ name, email, password: encPass});
            

            // Save the user object
            await user.save();

            res.status(200).json({ success: "success" });
        } else {
            res.status(500).json({ error: "Invalid request method" });
        }

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export default handler;
