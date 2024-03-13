const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (value) => {
                return validator.isEmail(value);
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    accountBalance: {
        type: Number,
        default: 0
    },
    dateJoined: {
        type: Date,
        default: Date.now
    },
    assets: [
        {
            assetId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Asset'
            },
            quantity: {
                type: Number,
                default: 0
            }
        }
    ]       
});

module.exports = mongoose.model('User', userSchema);