const Asset = require('../models/asset');

async function getAssets(req, res) {
    try{
        const userId = req.userData.userId;
        const user = await User.findById(userId).populate('assets');
        if(!user){
            return res.status(404).json({ message: "User not found" });
        }
        const assets = user.assets;
        
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

        // Return the asset
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
