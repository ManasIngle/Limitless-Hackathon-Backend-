// const router = require('express').Router();
// const { login, register } = require('../controllers/auth');
// const authenticateUser = require('../middlewares/IsloggedIn')

// router.post('/login').post(authenticateUser, login);

// router.post('/register', register);

// // router.post('/', authController.logout);


// module.exports = router;


const router = require('express').Router();
const { login, register } = require('../controllers/auth');
const authenticateUser = require('../middlewares/IsloggedIn');

// Define routes
router.post('/login', authenticateUser, login);
router.post('/register', register);

module.exports = router;
