const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    lister: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    assetId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Asset',
        required: true
    },
    assetClass: {
        type: String,
        required: true,
        enum: ['Equity', 'Commodity', 'Currency']
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    completed: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        enum: ['Pending', 'Completed','Processing','Cancelled'],
        default: 'Pending'
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Order', orderSchema);