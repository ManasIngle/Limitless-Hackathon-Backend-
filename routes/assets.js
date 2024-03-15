const router = require('express').Router();
const authmiddleware = require('../middlewares/authmiddleware');

const { getAssets, getSingleAsset } = require('../controllers/assets');

router.get('/userAssets',authmiddleware, getAssets);

router.get('/:id', getSingleAsset);

module.exports = router;