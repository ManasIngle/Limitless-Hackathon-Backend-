const portfolioSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    assets: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Asset'
    }],

    created: {
        type: Date,
        default: Date.now
    }

});