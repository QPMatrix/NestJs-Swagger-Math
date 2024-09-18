const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
// Load environment variables from .env file
dotenv.config();
const secretKey = process.env.JWT_SECRET;
/**
 * JWT Middleware to verify token.
 * If valid, adds user data to the request object and calls next().
 * If invalid or missing, returns an appropriate error response.
 */
function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization'];

    // Check if the Authorization header is present
    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization header required', status: 401 });
    }

    // Extract the token from the Authorization header
    const token = authHeader.split(' ')[1];

    // Check if the token is missing
    if (!token) {
        return res.status(401).json({ message: 'Token missing', status: 401 });
    }

    // Verify the token
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid or expired token', status: 403 });
        }

        // Attach user data (decoded from token) to the request object
        req.user = decoded;
        next(); // Proceed to the next middleware or controller
    });
}

module.exports = verifyToken;