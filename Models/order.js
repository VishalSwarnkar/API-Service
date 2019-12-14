const mongoose = require('mongoose');

// const mongoose = require('mongoose');
// mongoose.Promise = require('bluebird');

// const url = 'mongodb://localhost:27017/orders';
// const connect = mongoose.connect(url, { useNewUrlParser: true });

// connect.then((db)=>{
//   console.log('Successfully connected to Orders db');
// },(error)=>{
//   console.log(error);
// });

const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: true
    },
    quantity: {
        type: Number,
        default: 1
    },
    amount: {
        type: Number,
    },
    city: {
        type: String
    }
})

module.exports = mongoose.model('Order', orderSchema, 'Order');