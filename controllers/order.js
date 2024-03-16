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

exports.buy = async (req, res) => {
    try {
        const userId = req.userData.userId;
        const { orderId} = req.body;
        console.log(orderId);
        const order = await Orders.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }      
        order.buyer = userId;
        order.status = 'Processing';
        order.save();
        res.status(200).json({ message: "Order placed successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

exports.confirmation = async (req, res) => {
    try{
        const userId = req.userData.userId;
        const { orderId } = req.body;
        const order = await Orders.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        if (order.lister != userId) {
            return res.status(403).json({ message: "You are not authorized to confirm this order" });
        }
        order.status = 'Completed';
        const buyer = await User.findById(order.buyer);
        const seller = await User.findById(order.lister);
        buyer.assets.push({ assetId: order.assetId, quantity: order.quantity });
        seller.assets.pop({ assetId: order.assetId, quantity: order.quantity });
        buyer.save();
        seller.save();
        order.save();
        res.status(200).json({ message: "Order confirmed successfully" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

exports.cancel = async (req, res) => {
    try{
        const userId = req.userData.userId;
        const { orderId } = req.body;
        const order = await Orders.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        if (order.lister != userId) {
            return res.status(403).json({ message: "You are not authorized to cancel this order" });
        }
        order.status = 'Cancelled';
        order.save();
        res.status(200).json({ message: "Order cancelled successfully" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}





