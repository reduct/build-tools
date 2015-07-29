#! /usr/bin/env node
'use strict';

var exec = require('child_process').exec;
var metaData = require('./../Utilities/MetaData.js');

module.exports = function () {
    var filePath = metaData.coverageReportFile;

    return new Promise(function (resolve, reject) {
        if (filePath) {
            exec('cat ' + filePath + ' | codeclimate', function (err) {
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