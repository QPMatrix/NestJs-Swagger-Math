'use strict';
const utils = require('../utils/writer.js');
const AuthService = require('../service/AuthService');

/**
 * Controller for handling user login.
 *
 * This function takes in the request body with the user's credentials (username and password),
 * forwards them to the AuthService for validation and token generation, and handles the response.
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @param {Function} next - The next middleware function in the Express.js chain (unused here).
 */
module.exports.login = function login(req, res, next) {
    const { body } = req;

    // Call the AuthService to validate credentials and generate a JWT token.
    AuthService.login(body)
        .then(function(response) {
            console.log('Login successful:', response);
            // On success, send the JWT token in the response.
            utils.writeJson(res, response);
        })
        .catch(function(error) {
            console.error('Error during login:', error);

            // Ensure status is handled correctly and fallback to 400 if not provided.
            const statusCode = error.status || 400;
            // On failure, send the error message and status code.
            utils.writeJson(res, { message: error.message }, statusCode);
        });
};
