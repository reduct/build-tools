#! /usr/bin/env node

var exec = require('child_process').exec;
var clc = require('cli-color');
var metaData = require('./../Utilities/MetaData.js');

module.exports = () => {
    var filePath = metaData.coverageReportFile;

    return new Promise((resolve, reject) => {
        if (filePath) {
            exec('cat ' + filePath + ' | codeclimate', (err) => {
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
