const mongoose = require('mongoose');

const assetSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    symbol: {
        type: String,
        required: true,
        unique: true,
        uppercase: true
    },

    description: {
        type: String
    },

    assetClass: {
        type: String,
        required: true,
        enum: ['Equity', 'Fixed Income', 'Commodity', 'Currency']
    },

    marketValue: {
        type: Number,
        min: 0
    },



});

module.exports = mongoose.model('Asset', assetSchema);