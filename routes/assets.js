const router = require('express').Router();
const authmiddleware = require('../middlewares/authmiddleware');

const { getAssets, getAsset } = require('../controllers/assets');

router.get('/assets',authmiddleware, getAssets);

router.get('/:id', getAsset);

module.exports = router;