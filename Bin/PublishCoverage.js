#! /usr/bin/env node

var exec = require('child_process').exec;

module.exports = (args) => {
    var filePath = args[0];

    return new Promise((resolve, reject) => {
        if(filePath) {
            exec('cat ' + filePath + ' | codeclimate', (err) => {
                if (err) {
                    throw err;
                }

                resolve();
            });
        } else {
            console.info('Please specify an coverage file to publish as an argument while running "reduct publish-coverage".');

            reject();
        }
    });
};
