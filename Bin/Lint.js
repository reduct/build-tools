#! /usr/bin/env node

var ESLintRunner = require('./../Lib/ESLintRunner.js');
var JSCSRunner = require('./../Lib/JSCSRunner.js');
var metaData = require('./../Utilities/MetaData.js');

module.exports = () => {
    var sourcePath = metaData.paths.src;
    var esLintInstance = new ESLintRunner(sourcePath);
    var jscsLintInstance = new JSCSRunner(sourcePath);

    return esLintInstance.lint().then(() => {
        console.log('\n');

        return jscsLintInstance.lint();
    }).catch(() => {
        process.exit(1);
    });
};
