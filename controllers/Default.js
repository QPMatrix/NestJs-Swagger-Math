'use strict';

var utils = require('../utils/writer.js');
var Default = require('../service/DefaultService');

module.exports.calculate = function calculate (req, res, next, body, operation) {
  Default.calculate(body, operation)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
