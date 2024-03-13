const jwt = require('jsonwebtoken');

const SECRET_KEY = 'secret_key';

exports.generateToken = (userId) => {
    const token = jwt.sign({ userId }, SECRET_KEY, { expiresIn: '1h' });
    return token;
};

exports.verifyToken = (token) => {
    try {
        const decodedToken = jwt.verify(token, SECRET_KEY);
        return decodedToken;
    } catch (error) {
        throw new Error('Invalid token');
    }
};
