#! /usr/bin/env node

var Mocha = require('mocha');
var metaData = require('./../Utilities/MetaData.js');
var getFiles = require('./../Utilities/GetFiles.js');
var cwd = process.cwd();

module.exports = () => {
    var mochaInstance = new Mocha();

    getFiles(cwd, '.spec.js', (fileName) => {
        mochaInstance.addFile(fileName);
    });

    return new Promise((resolve, reject) => {
        mochaInstance.run((failures) => {
            if(failures) {
                reject();
            } else {
                resolve();
            }
        });
    })
};
