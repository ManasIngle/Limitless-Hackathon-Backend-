const router = require('express').Router();

const { getAccount, updateAccount } = require('../controllers/account');

router.get('/:id', getAccount);

router.put('/:id', updateAccount);

module.exports = router;