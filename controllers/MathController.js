'use strict';

const utils = require('../utils/writer.js');
const MathController = require('../service/MathService');

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
    MathController.calculate(body, operation)
        .then(function(response) {
            // On success, send the response containing the result using the utility function.
            utils.writeJson(res, response);
        })
        .catch(function(response) {
            // On failure, send the error response using the utility function.
            utils.writeJson(res, response);
        });
};
