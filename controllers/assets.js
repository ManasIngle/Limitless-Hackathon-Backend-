const Asset = require('../models/asset');

async function getAssets(req, res) {
    try {
        // Fetch all assets logic
        const assets = await Asset.find();

        // Return the assets
        res.status(200).json({ assets });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

async function getAsset(req, res) {
    try {
        // Fetch single asset logic
        const assetId = req.params.id; // Assuming the asset ID is passed as a route parameter
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
    getAsset
};
