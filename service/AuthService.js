'use strict';
const jwt = require('jsonwebtoken');
const userData = require('../mock/userData');  // Mock user data
const generateToken = require('../utils/generate-token');  // Utility function to generate JWT token


/**
 * Service for handling user login and generating a JWT token.
 *
 * This function verifies the user's credentials and generates a JWT token if valid.
 *
 * @param {Object} body - The request body containing the login credentials (username, password).
 * @returns {Promise<Object>} - A promise that resolves to a JWT token if login is successful.
 */
exports.login = function (body) {
    return new Promise(function (resolve, reject) {

        const { username, password } = body;


        // Validate input: both username and password must be provided.
        if (!username || !password) {
            return reject({ message: "Invalid input. Both 'username' and 'password' must be provided.", status: 400 });
        }

        // Find user in the mock userData array.
        const user = userData.find(u => u.username === username && u.password === password);

        // If user not found or credentials are invalid, reject with 401 Unauthorized.
        if (!user) {
            return reject({ message: "Invalid username or password.", status: 401 });
        }


        // Generate JWT token.
        const token = generateToken(user)


        // Resolve with the generated token.
        resolve({ token });
    });
};
