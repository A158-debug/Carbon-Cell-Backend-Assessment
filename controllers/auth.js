const User = require("../models/user.model.js")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

require('dotenv').config()  
const secret = process.env.JWT_SECRET_KEY;

const signup = async (req, res) => {
    const { name, email, password } = req.body;
    // console.log(name, email, password);

    try {
        const oldUser = await User.findOne({ email: email, password: password });
        console.log(oldUser);
        if (oldUser) return res.status(400).json({ message: "User already exists" });

        // console.log("user");

        if (password.length < 6) return res.status(400).json({ message: "Password less than 6 characters" })

        const hashedPassword = await bcrypt.hash(password, 12);
        const result = await User.create({ email: email, password: hashedPassword, name: name });
        // console.log(result);
        console.log(secret);
        const token = jwt.sign({ email: result.email, id: result._id }, secret, { expiresIn: "1h" });
        console.log(token);
        res.status(201).json({ message: "User is created successfully", result, token });

    } catch (error) {
        res.status(500).json({ message: "Try Again! - User not created " });
    }
}

const signin = async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);
    try {
        const oldUser = await User.findOne({ email });
        console.log(oldUser);
        if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });

        const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);
        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "1h" });
        res.status(200).json({ message: "User Logged In", oldUser, token });

    } catch (err) {
        res.status(500).json({ message: "Login Not Succesfull" });
    }
};

module.exports = { signin, signup }

