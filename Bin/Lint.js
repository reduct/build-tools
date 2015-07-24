#! /usr/bin/env node

var ESLintRunner = require('./../Lib/ESLintRunner.js');

module.exports = function(args) {
    var sourcePath = args[0] || 'Src/';
    var esLintInstance = new ESLintRunner(sourcePath);

    esLintInstance.lint();
};
