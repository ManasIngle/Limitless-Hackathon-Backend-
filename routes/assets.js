const router = require('express').Router();

const { getAssets, getAsset } = require('../controllers/assets');

router.get('/', getAssets);

router.get('/:id', getAsset);

module.exports = router;