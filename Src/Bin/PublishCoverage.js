#! /usr/bin/env node

var exec = require('child_process').exec;
var fs = require('fs');
const executablePath = 'node_modules/@reduct/build-tools/CreateCoverage.sh';

function publishCoverage () {
    return new Promise((resolve, reject) => {
        exec('codeclimate-test-reporter < coverage/coverage.lcov', (err) => {
            if (err) {
                throw err;
            }

            resolve();
        });
    });
}

function createCoverage () {
    return new Promise((resolve, reject) => {
        exec(executablePath, (err) => {
            if (err) {
                throw err;
            }

            resolve();
        });
    });
}

module.exports = () => {
    // Make sure that the file permissions for the executable are valid.
    fs.chmodSync(executablePath, '755');

    return createCoverage().then(() => {
        return publishCoverage();
    });
};
