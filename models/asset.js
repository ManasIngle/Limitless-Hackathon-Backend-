const mongoose = require('mongoose');

const assetSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    logo: {
        type: String,
        default: 'https://static.mediawire.in//images/default-corporate-image.jpg'
    },
    ticker: {
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

    PastValues: [
        {
            date: {
                type: Date,
                required: true
            },
            price: {
                type: Number,
                required: true
            }
        }
    ],
});

module.exports = mongoose.model('Asset', assetSchema);