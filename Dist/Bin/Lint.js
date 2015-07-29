#! /usr/bin/env node
'use strict';

var ESLintRunner = require('./../Lib/ESLintRunner.js');
var JSCSRunner = require('./../Lib/JSCSRunner.js');
var metaData = require('./../Utilities/MetaData.js');

module.exports = function () {
    var sourcePath = metaData.paths.src;
    var esLintInstance = new ESLintRunner(sourcePath);
    var jscsLintInstance = new JSCSRunner(sourcePath);

    return esLintInstance.lint().then(function () {
        console.log('');

        return jscsLintInstance.lint();
    })['catch'](function () {
        throw new Error('@reduct/build-tools: Something went wrong while running the lint task.');
    });
};