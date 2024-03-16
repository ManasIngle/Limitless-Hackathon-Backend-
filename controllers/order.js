const Orders = require('../models/orders');
const Asset = require('../models/asset');
const User = require('../models/user');
const mongoose = require('mongoose')

exports.createListing = async (req, res) => {
    try{
        const userId = req.userData.userId;
        const { assetName,description,assetClass,price,quantity } = req.body;
        const ticker = assetName.split(' ').join('').toUpperCase();
        
        const asset = await Asset.create({ name: assetName, ticker, description, assetClass});
        const user = await User.findById(userId);
        console.log(asset);
        user.assets.push({ assetId: asset._id, quantity });
        user.save();
        const order = await Orders.create({ lister: userId, assetId: asset._id, price, quantity });

        res.status(201).json({ order });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

exports.history = async (req, res) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.userData.userId) ;
        const orders = await Orders.find({ $or: [{ lister:userId }, { buyer: userId }] });
        res.status(200).json({ orders });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

exports.findListings = async (req, res) => {
    try {
        const orders = await Orders.find({ buyer: null });
        res.status(200).json({ orders });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}





