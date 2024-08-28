const Transactions = require('../models/transactions');
const Asset = require('../models/asset');
const User = require('../models/user');
const mongoose = require('mongoose')
const Orders = require('../models/orders');

exports.getAllTransactions = async (req, res) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.userData.userId);
        const status = req.query.status;
        const transactions = await Transactions.find({ $or: [{ buyer: userId }, { seller: userId }] }).populate('assetId');
        if (status) {
            const filteredTransactions = transactions.filter(transaction => transaction.status === status);
            return res.status(200).json({ transactions: filteredTransactions });
        }
        res.status(200).json({ transactions });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

exports.getSingleTransaction = async (req, res) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.userData.userId);
        const transactionId = req.params.id;
        const transaction = await Transactions.findById(transactionId).populate('assetId');
        if (!transaction) {
            return res.status(404).json({ message: "Transaction not found" });
        }
        if(transaction.buyer !== userId && transaction.seller !== userId){
            return res.status(403).json({ message: "Unauthorized" });
        }
        res.status(200).json({ transaction });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

exports.sellerTransactions = async (req, res) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.userData.userId);
        console.log(userId);
        // send the transactions where the seller is the current user and status is pending
        const transactions = await Transactions.find({ seller: userId }).populate('assetId');
        const filteredTransactions = transactions.filter(transaction => transaction.status === 'Pending');
        console.log(filteredTransactions);
        res.status(200).json({ filteredTransactions });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

exports.confirmTransaction = async (req, res) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.userData.userId);
        const transactionId = new mongoose.Types.ObjectId(req.body.transactionId);
        const transaction = await Transactions.findById(transactionId);
        if (!transaction) {
            return res.status(404).json({ message: "Transaction not found" });
        }
        if(transaction.seller.toString() !== userId.toString()){
            console.log(transaction.seller, userId);
            return res.status(403).json({ message: "Unauthorized" });
        }
        if(isExpired(transaction.date)){
            transaction.status = 'Cancelled';
            await transaction.save();
            return res.status(400).json({ message: "Transaction expired" });
        }
        if(transaction.status === 'Completed'){
            return res.status(400).json({ message: "Transaction already completed" });
        }
        
        const Order = await Orders.findById(transaction.orderId);
        Order.status = 'Completed';
        await Order.save();

        transaction.status = 'Completed';
        await transaction.save();
        const buyer = await User.findById(transaction.buyer);
        const seller = await User.findById(transaction.seller);
        const asset = await Asset.findById(transaction.assetId);

        const quantityToAdd = parseInt(transaction.quantity);

        //if the asset is present in the buyer's assets, update the quantity
        const assetIndex = buyer.assets.findIndex(asset => asset.assetId.toString() === transaction.assetId.toString());
        if (assetIndex !== -1) {
            buyer.assets[assetIndex].quantity += quantityToAdd;
        } else {
            buyer.assets.push({ assetId: transaction.assetId, quantity: transaction.quantity });
        }

        //if the asset is present in the seller's assets, update the quantity
        const assetIndex2 = seller.assets.findIndex(asset1 => asset1.assetId.toString() === transaction.assetId.toString());
        console.log(assetIndex2);
        if (assetIndex2 !== -1) {
            seller.assets[assetIndex2].quantity -= quantityToAdd;
            if(seller.assets[assetIndex2].quantity === 0){
                seller.assets.splice(assetIndex2, 1);
            }
        }
        asset.PastValues.push({ date: new Date(),price: transaction.price});
        
        await asset.save();
        await buyer.save();
        await seller.save();
        res.status(200).json({ message: "Transaction completed successfully" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

function isExpired(date){
    const diff = new Date() - date;
    const diffInHours = diff / (1000 * 60 * 60);
    return diffInHours > 24;
}

exports.refreshTransactions = async (req, res) => {
    try {
        console.log(req.userData);
        const userId = new mongoose.Types.ObjectId(req.userData.userId);
        console.log(userId);
        const transactions = await Transactions.find({ $or: [{ buyer: userId }, { seller: userId }] });
        for (let i = 0; i < transactions.length; i++) {
            if (transactions[i].status === 'Pending' && isExpired(transactions[i].date)) {
                transactions[i].status = 'Cancelled';
                await transactions[i].save();
            }
        }
        res.status(200).json({ transactions });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}


exports.cancelTransaction = async (req, res) => {
    try {
        const userId = req.userData.userId;
        const transactionId = req.body.transactionId;
        const transaction = await Transactions.findById(transactionId);
        if (!transaction) {
            return res.status(404).json({ message: "Transaction not found" });
        }
        console.log(transaction.buyer, userId);
        console.log(transaction.seller, userId);
        if(transaction.buyer.toString() !== userId && transaction.seller.toString() !== userId){
            return res.status(403).json({ message: "Unauthorized" });
        }
        if(transaction.status === 'Completed'){
            return res.status(400).json({ message: "Transaction already completed" });
        }
        transaction.status = 'Cancelled';
        await transaction.save();
        res.status(200).json({ message: "Transaction cancelled successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

