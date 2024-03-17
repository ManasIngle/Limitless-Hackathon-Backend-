const Orders = require('../models/orders');
const Asset = require('../models/asset');
const User = require('../models/user');
const Transaction = require('../models/transactions');
const mongoose = require('mongoose')

exports.createListing = async (req, res) => {
    try{
        const userId = req.userData.userId;
        const { assetName,description,assetClass,price,quantity,ticker } = req.body;
        let asset = await Asset.findOne({ ticker });
        if (!asset) {
            asset = await Asset.create({ assetName,description,assetClass,price,ticker });
        }
        const user = await User.findById(userId);
        console.log(asset._id);
        //if user already has the asset, update the quantity in user I have a assets array and in that I have assetId and quantity
        const assetIndex = user.assets.findIndex(asset1 => asset1.assetId.toString() === asset._id.toString());
        console.log(assetIndex);
        if (assetIndex !== -1) {
            //add the values of quantity
            const quantityToAdd = parseInt(quantity);
            user.assets[assetIndex].quantity += quantityToAdd;
        } else {
            user.assets.push({ assetId: asset._id, quantity });
        }
        user.save();
        const order = await Orders.create({ lister: userId, assetId: asset._id, price, quantity,assetClass});

        res.status(201).json({ order });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

exports.history = async (req, res) => {
    try {
        const userId = req.userData.userId;
        //add filter for status
        const{ status} = req.query;
        const orders = await Orders.find({ lister: userId }).populate('assetId');
        if (status) {
            const filteredOrders = orders.filter(order => order.status === status);
            return res.status(200).json({ orders: filteredOrders });
        }
        res.status(200).json({ orders });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

exports.findListings = async (req, res) => {
    try {
        const{ assetclass} = req.query;
        const orders = await Orders.find({ status: 'Pending'}).populate('assetId');
        if (assetclass) {
            const filteredOrders = orders.filter(order => order.assetClass === assetclass);
            return res.status(200).json({ orders: filteredOrders });
        }
        res.status(200).json({ orders });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

exports.getSingleListing = async (req, res) => {
    try {
        const orderId = new mongoose.Types.ObjectId(req.query);
        console.log(orderId);
        const order = await Orders.findById(orderId).populate('assetId');
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json({ order });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

exports.buy = async (req, res) => {
    try {
        const userId = req.userData.userId;
        const { orderId} = req.body;
        const order = await Orders.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        if (order.lister == userId) {
            return res.status(403).json({ message: "You cannot buy your own listing" });
        }
        if (order.status !== 'Pending') {
            return res.status(400).json({ message: "Order is not available" });
        }
        const transaction = await Transaction.create({ buyer: userId, seller: order.lister, assetId: order.assetId, quantity: order.quantity, price: order.price });        
        order.status = 'Completed';
        order.buyer = userId;
        order.save();
        res.status(200).json({ message: "Order placed successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

// exports.confirmation = async (req, res) => {
//     try{
//         const userId = req.userData.userId;
//         const { orderId } = req.body;
//         const order = await Orders.findById(orderId);
//         if (!order) {
//             return res.status(404).json({ message: "Order not found" });
//         }
//         if (order.lister != userId) {
//             return res.status(403).json({ message: "You are not authorized to confirm this order" });
//         }
//         order.status = 'Completed';
//         const buyer = await User.findById(order.buyer);
//         const seller = await User.findById(order.lister);
//         buyer.assets.push({ assetId: order.assetId, quantity: order.quantity });
//         seller.assets.pop({ assetId: order.assetId, quantity: order.quantity });
//         buyer.save();
//         seller.save();
//         order.save();
//         res.status(200).json({ message: "Order confirmed successfully" });
//     }
//     catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Internal Server Error" });
//     }
// }

exports.cancel = async (req, res) => {
    try{
        const userId = req.userData.userId;
        const orderId = new mongoose.Types.ObjectId(req.body.orderId);
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





