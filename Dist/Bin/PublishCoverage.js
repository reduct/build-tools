#! /usr/bin/env node
'use strict';

var exec = require('child_process').exec;

function publishCoverage() {
    return new Promise(function (resolve, reject) {
        exec('cat coverage/coverage.lcov | codeclimate', function (err) {
            if (err) {
                throw err;
            }

            resolve();
        });
    });
}

function createCoverage() {
    return new Promise(function (resolve, reject) {
        exec('node_modules/@reduct/build-tools/test.sh', function (err) {
            if (err) {
                throw err;
            }

            resolve();
        });
    });
}

module.exports = function () {
    return createCoverage().then(function () {
        return publishCoverage();
    });
};