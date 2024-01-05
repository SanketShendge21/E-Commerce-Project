const mongoose = require('mongoose'); // Import the mongoose module

const OrderSchema = new mongoose.Schema({
    email : {type : String, required: true},
    orderId :{type : String, required: true},
    paymentInfo: {type : String, default: ''},
    products: {type : Object, required: true},
    address: {type : String, required: true},
    transactionId: {type : String},
    amount: {type : Number, required: true},
    status: {type : String, required: true, default:'Initiated'},
    deliveryStatus: {type : String, required: true, default:'Unshipped'}
}, { timestamps: true } );

//mongoose.models = {}; appears to be used to reset the models property of the mongoose object to an empty object ({}). This can be done to clear any existing models that may have been registered, effectively resetting the state related to models.

// Method 1
// // mongoose.models = {}; // it tries to redefine a model so we make it empty first we dont want to make models again if servers restart

// export default mongoose.model('Order', OrderSchema); // Export the Order Schema


// Method 2
export default mongoose.models.Order || mongoose.model('Order', OrderSchema)