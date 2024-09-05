const router = require('express').Router();
const authmiddleware = require('../middlewares/authmiddleware');

const {createListing,history,findListings,getSingleListing,buy,confirmation,cancel} = require('../controllers/order');

router.post('/create', authmiddleware, createListing);

router.get('/history',authmiddleware,history);

router.get('/findListings',findListings);

router.get('/getSingleListing',getSingleListing);

router.post('/buy',authmiddleware,buy);

router.post('/cancel',authmiddleware,cancel);

module.exports = router;





