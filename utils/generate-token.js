const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const secretKey = process.env.JWT_SECRET;
const expiry = process.env.JWT_EXPIRATION || '1h';

/**
 * Utility function to generate a valid JWT token.
 *
 * @param {Object} user - The user data to encode in the JWT.
 * @param {string} [expiration=expiry] - Optional token expiration time, can override default expiry.
 * @returns {string} - The generated JWT token.
 */
function generateToken(user = { username: 'user1' }, expiration = expiry) {
    return jwt.sign(user, secretKey, { expiresIn: expiration });
}

module.exports = generateToken;
