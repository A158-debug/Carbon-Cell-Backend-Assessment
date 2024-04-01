const User = require("../models/user.model.js")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

require('dotenv').config()  
const secret = process.env.JWT_SECRET_KEY;

const signup = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const oldUser = await User.findOne({ email: email, password: password });

        if (oldUser) return res.status(400).json({ message: "User already exists" });

        if (password.length < 6) return res.status(400).json({ message: "Password less than 6 characters" })

        const hashedPassword = await bcrypt.hash(password, 12);
        const result = await User.create({ email: email, password: hashedPassword, name: name });

        const token = jwt.sign({ email: result.email, id: result._id }, secret, { expiresIn: "1h" });
 
        res.status(201).json({ message: "Account created successfully.", token });

    } catch (error) {
        res.status(500).json({ message: "Error creating account. Please try again later. " });
    }
}

const signin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const oldUser = await User.findOne({ email });
   
        if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });

        const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);
        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "1h" });
        res.status(200).json({ message: "Logged in successfully", oldUser, token });

    } catch (err) {
        res.status(500).json({ message: "Login Not Succesfull" });
    }
};

module.exports = { signin, signup }

