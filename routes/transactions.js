const router = require('express').Router();
const authmiddleware = require('../middlewares/authmiddleware');

const {getAllTransactions, getSingleTransaction,confirmTransaction,cancelTransaction,refreshTransactions} = require('../controllers/transactions');

router.get('/all',authmiddleware, getAllTransactions);

router.get('/:id',authmiddleware, getSingleTransaction);

router.post('/confirm',authmiddleware,confirmTransaction);

router.post('/cancel',authmiddleware,cancelTransaction);

router.post('/refresh',authmiddleware,refreshTransactions);

module.exports = router;