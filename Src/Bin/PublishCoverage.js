#! /usr/bin/env node

var exec = require('child_process').exec;

function publishCoverage () {
    return new Promise((resolve, reject) => {
        exec('cat coverage/coverage.lcov | codeclimate', (err) => {
            if (err) {
                throw err;
            }

            resolve();
        });
    });
}

function createCoverage () {
    return new Promise((resolve, reject) => {
        exec('node_modules/@reduct/build-tools/test.sh', (err) => {
            if (err) {
                throw err;
            }

            resolve();
        });
    });
}

module.exports = () => {
    return createCoverage().then(() => {
        return publishCoverage();
    });
};
