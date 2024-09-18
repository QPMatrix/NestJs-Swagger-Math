'use strict';


/**
 * Perform an arithmetic operation
 *
 * body Math_calculate_body 
 * operation String The operation to be performed (add, subtract, multiply, divide)
 * returns BigDecimal
 **/
exports.calculate = function(body,operation) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = 0.8008281904610115;
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

