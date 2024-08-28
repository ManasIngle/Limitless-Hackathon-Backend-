const router = require('express').Router();
const authmiddleware = require('../middlewares/authmiddleware');

const {getAllTransactions, getSingleTransaction,confirmTransaction,cancelTransaction,refreshTransactions, sellerTransactions} = require('../controllers/transactions');

router.get('/all',authmiddleware, getAllTransactions);

router.get('/seller',authmiddleware,sellerTransactions);

router.get('/:id',authmiddleware, getSingleTransaction);

router.post('/confirm',authmiddleware,confirmTransaction);

router.post('/cancel',authmiddleware,cancelTransaction);

router.post('/refresh',authmiddleware,refreshTransactions);

module.exports = router;