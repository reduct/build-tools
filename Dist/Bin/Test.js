#! /usr/bin/env node
'use strict';

var Mocha = require('mocha');
var getFiles = require('./../Utilities/GetFiles.js');
var cwd = process.cwd();

module.exports = function () {
    var mochaInstance = new Mocha();

    getFiles(cwd, '.spec.js', function (fileName) {
        mochaInstance.addFile(fileName);
    });

    return new Promise(function (resolve, reject) {
        mochaInstance.run(function (failures) {
            if (failures) {
                reject();
            } else {
                resolve();
            }
        });
    });
};