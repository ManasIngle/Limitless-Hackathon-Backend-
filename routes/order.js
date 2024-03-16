const router = require('express').Router();
const authmiddleware = require('../middlewares/authmiddleware');

const {createListing,history,findListings} = require('../controllers/order');

router.post('/create', authmiddleware, createListing);

router.get('/history',authmiddleware,history);

router.get('/findListings',findListings);

module.exports = router;





