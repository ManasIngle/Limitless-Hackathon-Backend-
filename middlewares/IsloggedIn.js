
// function authenticateUser(req, res, next) {
//     const userId = req.cookies.userId;
//     const user = users.find(u => u.id === userId);

//     if (!user) {
//         return res.status(401).json({ error: 'Unauthorized' });
//     }

//     req.user = user;
//     next();
// }



// Middleware to check if a user is authenticated
const User = require('../models/user');

async function authenticateUser(req, res, next) {
    try {
        const userId = req.cookies.userId;
        
        // Query the database to find the user
        const user = await User.findById(userId);

        if (!user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        // Attach the user object to the request for further use
        req.user = user;
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = authenticateUser;
