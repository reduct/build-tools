#! /usr/bin/env node

var ESLintRunner = require('./../Lib/ESLintRunner.js');
var JSCSRunner = require('./../Lib/JSCSRunner.js');

module.exports = (args) => {
    var sourcePath = args[0] || 'Src/';
    var esLintInstance = new ESLintRunner(sourcePath);
    var jscsLintInstance = new JSCSRunner(sourcePath);

    return esLintInstance.lint().then(() => {
        console.log('\n');

        return jscsLintInstance.lint();
    }).catch(() => {
        process.exit(1);
    });
};
