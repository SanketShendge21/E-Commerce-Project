const mongoose = require('mongoose'); // Import the mongoose module

const ProductSchema = new mongoose.Schema({
    title : {type : String, required: true},
    slug : {type : String, required: true, unique: true},
    desc : {type : String, required: true},
    img : {type : String, required: true},
    category : {type : String, required: true},
    size : {type : String},
    color : {type : String},
    price : {type : Number},
    availableQty : {type : Number, required: true},

}, { timestamps: true } );

//mongoose.models = {}; appears to be used to reset the models property of the mongoose object to an empty object ({}). This can be done to clear any existing models that may have been registered, effectively resetting the state related to models.
// mongoose.models = {}; // it tries to redefine a model so we make it empty first we dont want to make models again if servers restart

// export default mongoose.model('Product', ProductSchema); // Export the Product Schema


// Method 2
export default mongoose.models.Product || mongoose.model('Product', ProductSchema)
