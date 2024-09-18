'use strict';
const jwt = require('jsonwebtoken');
/**
 * Service for handling arithmetic operations.
 *
 * This function performs the specified arithmetic operation (add, subtract, multiply, divide)
 * on the two numeric values provided in the request body.
 *
 * @param {Object} body - The request body containing the numeric values for the operation.
 * @param {number} body.a - The first numeric value.
 * @param {number} body.b - The second numeric value.
 * @param {string} operation - The arithmetic operation to perform (add, subtract, multiply, divide).
 * @returns {Promise<Object>} - A promise that resolves to the result of the arithmetic operation.
 */
exports.calculate = function(body, operation) {
  return new Promise(function(resolve, reject) {

    // Destructure the input values 'a' and 'b' from the request body.
    const { a, b } = body;

    // Input validation: Ensure both 'a' and 'b' are numbers.
    if (typeof a !== 'number' || typeof b !== 'number') {
      // Reject the promise if inputs are invalid, with an appropriate error message and status code.
      return reject({ message: "Invalid input. Both 'a' and 'b' must be numbers.", code: 400 });
    }

    // Additional validation: Prevent division by zero when performing a 'divide' operation.
    if (b === 0 && operation === 'divide') {
      // Reject the promise with an error message for invalid division by zero.
      return reject({ message: "Invalid input. Cannot divide by zero.", code: 400 });
    }

    let result;

    // Perform the arithmetic operation based on the value of 'operation'.
    switch (operation.toLowerCase()) {
      case 'add':
        result = a + b;
        break;
      case 'subtract':
        result = a - b;
        break;
      case 'multiply':
        result = a * b;
        break;
      case 'divide':
        result = a / b;
        break;
      default:
        // If the operation is not one of the allowed values, reject the promise with an error message.
        return reject({ message: "Invalid operation. Allowed values are 'add', 'subtract', 'multiply', 'divide'.", code: 400 });
    }

    // Resolve the promise with the result of the arithmetic operation.
    resolve({ result });
  });
};

/**
 * Service for handling user login and generating a JWT token.
 *
 * This function mocks user authentication by returning a JWT token when called.
 *
 * @param {Object} body - The request body containing the login credentials.
 * @returns {Promise<Object>} - A promise that resolves to the JWT token.
 */
exports.login = function(body) {
  return new Promise(function(resolve) {
    const token = {
      "token": "your-jwt-token-here"
    };

    // Resolve the promise with the generated token.
    resolve(token);
  });
};
