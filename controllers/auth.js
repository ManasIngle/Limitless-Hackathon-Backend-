// const User = require('../models/user');

// async function register(req, res) {
//     // Create user logic  
// }

// async function login(req, res) {
//     // Login logic
// }

// module.exports = {
//     register,
//     login
// }


const User = require('../models/user');
const bcrypt = require('bcrypt');

async function register(req, res) {
    try {
        const { username, password } = req.body;

        // Validate input
        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required" });
        }

        // Check if the user already exists
        let user = await User.findOne({ username });

        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        user = new User({
            username,
            password: hashedPassword
        });

        // Save the user to the database
        await user.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

async function login(req, res) {
    try {
        const { username, password } = req.body;

        // Validate input
        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required" });
        }

        // Find the user by username
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        // Check if the password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        // Password is valid, so create and return a token or set a session
        // Here you may use JWT for creating a token and returning it to the client
        // Example: const token = createToken(user);

        res.status(200).json({ message: "Login successful" /*, token */ });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = {
    register,
    login
};

