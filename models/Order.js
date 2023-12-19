const mongoose = require('mongoose'); // Import the mongoose module

const OrderSchema = new mongoose.Schema({
    userId : {type : String, required: true},
    products: [{
            productID: {type : String, required: true},
            quantity: {type : Number, default:1}
        }],
    address: {type : String, required: true},
    amount: {type : Number, required: true},
    status: {type : String, required: true, default:'Pending'}
}, { timestamps: true } );

mongoose.models = {}; // it tries to redefine a model so we make it empty first we dont want to make models again if servers restart

export default mongoose.model('Order', OrderSchema); // Export the Order Schema
