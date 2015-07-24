#! /usr/bin/env node

var ESLintRunner = require('./../Lib/ESLintRunner.js');
var JSCSRunner = require('./../Lib/JSCSRunner.js');

module.exports = function(args) {
    var sourcePath = args[0] || 'Src/';
    var esLintInstance = new ESLintRunner(sourcePath);
    var jscsLintInstance = new JSCSRunner(sourcePath);

    esLintInstance.lint();

    console.log('\n');

    jscsLintInstance.lint();
};
