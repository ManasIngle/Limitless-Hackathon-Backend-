const router = require('express').Router();
const authmiddleware = require('../middlewares/authmiddleware');

const {createListing} = require('../controllers/order');

router.post('/create', authmiddleware, createListing);

module.exports = router;





