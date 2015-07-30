#! /usr/bin/env node
'use strict';

var Mocha = require('mocha');
var clc = require('cli-color');
var getFiles = require('./../Utilities/GetFiles.js');
var cwd = process.cwd();

module.exports = function () {
    var mochaInstance = new Mocha();

    getFiles(cwd, '.spec.js', function (fileName) {
        if (fileName.indexOf('node_modules') === -1) {
            mochaInstance.addFile(fileName);
        }
    });

    console.log(clc.underline('Executing the specifications with mocha...'));

    return new Promise(function (resolve, reject) {
        mochaInstance.run(function (failures) {
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