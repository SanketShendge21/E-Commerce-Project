const mongoose = require('mongoose'); // Import the mongoose module

const UserSchema = new mongoose.Schema({
    name : {type : String, required: true},
    email : {type : String, required: true, unique: true},
    password : {type : String, required: true},
    address : {type : String, default: ''},
    pincode : {type : String, default: ''},
    phone : {type : String, default: ''}

}, { timestamps: true } );

//mongoose.models = {}; appears to be used to reset the models property of the mongoose object to an empty object ({}). This can be done to clear any existing models that may have been registered, effectively resetting the state related to models.
// mongoose.models = {}; // it tries to redefine a model so we make it empty first we dont want to make models again if servers restart

// export default mongoose.model('User', UserSchema); // Export the User Schema


// Method 2
export default mongoose.models.User || mongoose.model('User', UserSchema)