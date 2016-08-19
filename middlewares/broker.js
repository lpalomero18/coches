var fs = require('fs');
var exports = module.exports = {};



exports.getDriver = function(driver) {

    var tomaDriver = require('./'+driver + '.js');
    tomaDriver.test();
    return tomaDriver;
};