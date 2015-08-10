#! /usr/bin/env node
'use strict';

var exec = require('child_process').exec;
var fs = require('fs');
var executablePath = 'node_modules/@reduct/build-tools/CreateCoverage.sh';

function publishCoverage() {
    return new Promise(function (resolve) {
        exec('codeclimate-test-reporter < coverage.lcov', function (err) {
            if (err) {
                throw err;
            }

            resolve();
        });
    });
}

function createCoverage() {
    return new Promise(function (resolve) {
        exec(executablePath, function (err) {
            if (err) {
                throw err;
            }

            resolve();
        });
    });
}

module.exports = function () {
    // Make sure that the file permissions for the executable are valid.
    fs.chmodSync(executablePath, '755');

    return createCoverage().then(function () {
        return publishCoverage();
    });
};