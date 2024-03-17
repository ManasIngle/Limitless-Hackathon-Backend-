const Asset = require('../models/asset');
const User = require('../models/user');

async function getAssets(req, res) {
    try{
        const userId = req.userData.userId;
        const user = await User.findById(userId).populate('assets.assetId');
        res.status(200).json({ user });
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

async function getAllAssets(req, res) {
    try {
        const assets = await Asset.find();
        res.status(200).json({ assets });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = {
    getAssets,
    getSingleAsset,
    getAllAssets
};
