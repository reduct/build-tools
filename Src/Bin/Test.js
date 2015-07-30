#! /usr/bin/env node

var Mocha = require('mocha');
var clc = require('cli-color');
var getFiles = require('./../Utilities/GetFiles.js');
var cwd = process.cwd();

module.exports = () => {
    var mochaInstance = new Mocha();

    getFiles(cwd, '.spec.js', (fileName) => {
        if (fileName.indexOf('node_modules') === -1) {
            mochaInstance.addFile(fileName);
        }
    });

    console.log(clc.underline('Executing the specifications with mocha...'));

    return new Promise((resolve, reject) => {
        mochaInstance.run((failures) => {
            if (failures) {
                console.log(clc.red('\nSome files haven´t passed their specifications.'));

                reject(failures);
            } else {
                console.log(clc.green('All files have passed their specifications.\n\n'));

                resolve();
            }
        });
    });
};
