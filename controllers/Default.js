'use strict';

const utils = require('../utils/writer.js'); // Utility functions for sending responses.
const Default = require('../service/DefaultService'); // The service that handles arithmetic and login logic.

/**
 * Controller to handle the arithmetic calculation request.
 *
 * This function receives the request body and operation from the header,
 * forwards the data to the service layer for processing, and handles the response.
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @param {Function} next - The next middleware function in the Express.js chain (unused).
 * @param {Object} body - The request body containing the numbers to be used in the calculation.
 * @param {string} operation - The arithmetic operation to perform (provided via HTTP header).
 */
module.exports.calculate = function calculate(req, res, next, body, operation) {
    // Call the calculate method from the service with request body and operation.
    Default.calculate(body, operation)
        .then(function(response) {
            // On success, send the response containing the result using the utility function.
            utils.writeJson(res, response);
        })
        .catch(function(response) {
            // On failure, send the error response using the utility function.
            utils.writeJson(res, response);
        });
};

/**
 * Controller to handle user login and JWT token generation.
 *
 * This function receives the login credentials (mocked in this case),
 * forwards the data to the service layer for token generation, and handles the response.
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @param {Function} next - The next middleware function in the Express.js chain (unused).
 * @param {Object} body - The request body containing login credentials.
 */
module.exports.login = function login(req, res, next, body) {
    // Call the login method from the service to generate a JWT token.
    Default.login(body)
        .then(function(response) {
            // On success, send the response containing the token using the utility function.
            utils.writeJson(res, response);
        })
        .catch(function(response) {
            // On failure, send the error response using the utility function.
            utils.writeJson(res, response);
        });
};
