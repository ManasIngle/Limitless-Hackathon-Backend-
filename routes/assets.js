const router = require('express').Router();
const authmiddleware = require('../middlewares/authmiddleware');

const { getAssets, getSingleAsset,getAllAssets } = require('../controllers/assets');

router.get('/userAssets',authmiddleware, getAssets);

router.get('/:id', getSingleAsset);

router.get('/', getAllAssets)

module.exports = router;