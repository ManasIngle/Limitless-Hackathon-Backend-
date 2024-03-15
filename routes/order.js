const router = require('express').Router();
const authmiddleware = require('../middlewares/authmiddleware');

const {createListing,history} = require('../controllers/order');

router.post('/create', authmiddleware, createListing);

router.get('/history',authmiddleware,history);

module.exports = router;





