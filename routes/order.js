const router = require('express').Router();
const authmiddleware = require('../middlewares/authmiddleware');

const {createListing,history,findListings,buy,confirmation,cancel} = require('../controllers/order');

router.post('/create', authmiddleware, createListing);

router.get('/history',authmiddleware,history);

router.get('/findListings',findListings);

router.post('/buy',authmiddleware,buy);

router.post('/confirm',authmiddleware,confirmation);

router.post('/cancel',authmiddleware,cancel);

module.exports = router;





