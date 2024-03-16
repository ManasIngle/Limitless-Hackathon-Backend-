const router = require('express').Router();
const authmiddleware = require('../middlewares/authmiddleware');

const { getAccount, updateAccount, getAssets } = require('../controllers/user');

router.get('/getuserdeatils', authmiddleware, getAccount);

router.put('/', authmiddleware, updateAccount);



module.exports = router;