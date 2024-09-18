'use strict';
const jwt = require('jsonwebtoken');
const userData = require('../mock/userData');  // Mock user data

// JWT secret and expiry from environment variables
const secretKey = process.env.JWT_SECRET;
const expiry = process.env.JWT_EXPIRATION;

/**
 * Service for handling user login and generating a JWT token.
 *
 * @param {Object} body - The request body containing the login credentials.
 * @returns {Promise<Object>} - A promise that resolves to a JWT token if login is successful.
 */
exports.login = function(body) {
    return new Promise(function(resolve, reject) {
        const { username, password } = body;

        // Validate input
        if (!username || !password) {
            return reject({ message: "Invalid input. Both 'username' and 'password' must be provided.", code: 400 });
        }

        // Find user in the mock userData array
        const user = userData.find(u => u.username === username && u.password === password);

        // If user not found or credentials are invalid, reject with 401
        if (!user) {
            return reject({ message: "Invalid username or password.", code: 401 });
        }

        // Generate JWT token
        const token = jwt.sign({ username: user.username }, secretKey, { expiresIn: expiry });

        // Resolve with token
        resolve({ token });
    });
};
