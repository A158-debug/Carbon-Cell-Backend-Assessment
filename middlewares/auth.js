const jwt = require('jsonwebtoken');
const { trusted } = require('mongoose');

require('dotenv').config()  
const secret = process.env.JWT_SECRET_KEY;

// Middleware to verify JWT authentication
function verifyToken(req, res, next) {
    try {
        
        const token = req?.headers?.authorization?.split(" ")[1];
    
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized: No token provided' });
        }

        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Unauthorized: Invalid token' });
            }

            req.user = decoded;
            next();
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {verifyToken};
