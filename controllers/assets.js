const Asset = require('../models/asset');
const User = require('../models/user');

async function getAssets(req, res) {
    try{
        const userId = req.userData.userId;
        const user = await User.findById(userId);
        const assets = [];
        for (let i = 0; i < user.assets.length; i++) {
            const asset = await Asset.findById(user.assets[i].assetId);
            assets.push({ asset, quantity: user.assets[i].quantity });
        }
        
        res.status(200).json({ assets });
    }
    catch(error){
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

async function getSingleAsset(req, res) {
    try {
        const assetId = req.params.id;
        const asset = await Asset.findById(assetId);

        if (!asset) {
            return res.status(404).json({ message: "Asset not found" });
        }

        res.status(200).json({ asset });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = {
    getAssets,
    getSingleAsset
};
