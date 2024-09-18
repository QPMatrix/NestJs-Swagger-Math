const jwt = require('jsonwebtoken');
const {jwtSecret: secretKey, jwtExpiration: expiry} = require('../config');

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
