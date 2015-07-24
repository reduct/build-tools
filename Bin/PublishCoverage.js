#! /usr/bin/env node

var exec = require('child_process').exec;

module.exports = function(filePath) {
    if(filePath) {
        exec('cat ' + filePath + ' | codeclimate', function (err) {
            if (err) {
                throw err;
            }
        });
    } else {
        console.info('Please specify an coverage file to publish as an argument while running "node PublishCoverage.js".');
    }
};