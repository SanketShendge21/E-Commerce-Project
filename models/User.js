const mongoose = require('mongoose'); // Import the mongoose module

const UserSchema = new mongoose.Schema({
    name : {type : String, required: true},
    email : {type : String, required: true, unique: true},
    password : {type : String, required: true},

}, { timestamps: true } );

export default mongoose.model('User', UserSchema); // Export the User Schema
