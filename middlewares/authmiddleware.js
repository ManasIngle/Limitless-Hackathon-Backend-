const jwt = require('jsonwebtoken');

const SECRET_KEY = 'secret_key';

const middleware = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, SECRET_KEY);
        req.userData = { userId: decodedToken.userId };
        next();
    } catch (error) {
        res.status(401).json({ message: 'Auth failed!' });
    }
}

module.exports = middleware;
