#! /usr/bin/env node
'use strict';

var exec = require('child_process').exec;
var clc = require('cli-color');
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
            console.log(clc.yellow('Please specify a valid path to a coverage file in your package.json.'));

            reject();
        }
    });
};