'use strict';
const utils = require('../utils/writer.js');
const AuthService = require('../service/AuthService');

/**
 * Controller for handling user login.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - Middleware function (unused).
 * @param {Object} body - The request body containing username and password.
 */
module.exports.login = function login(req, res, next, body) {
    AuthService.login(body)
        .then(function(response) {
            utils.writeJson(res, response);
        })
        .catch(function(response) {
            utils.writeJson(res, response);
        });
};
