const User = require('../models/user');

async function getAccount(req, res) {
    try {
        // Fetch account logic
        const userId = req.userData.userId;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // Return the user account details
        res.status(200).json({ user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}


async function updateAccount(req, res) {
    try {
        const userId = req.user.id; // Assuming you have middleware to attach user info to the request
        const { name, email, password } = req.body;

        // Validate input if necessary

        // Update user's account details
        const user = await User.findByIdAndUpdate(userId, { name, email, password }, { new: true });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Return the updated user account details
        res.status(200).json({ user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}


module.exports = {
    getAccount,
    updateAccount,
}