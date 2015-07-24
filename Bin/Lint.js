#! /usr/bin/env node

var eslint = require('eslint');
var clc = require('cli-color');
var ESLintCLI = eslint.CLIEngine;
var eslintConfig = require('./../ESLint.json');

function esLintLogger(result) {
    console.log(clc.underline(result.filePath));

    result.messages.forEach(esLintLogOne);
}
function esLintLogOne(message) {
    var isFatal = message.fatal;
    var color = isFatal ? clc.red : clc.yellow;
    var messagePrefix = isFatal ? 'Error' : 'Warning';

    console.log(color(messagePrefix + ' on line ' + message.line + ' column ' + message.column + ':'), message.message);
}


module.exports = function(args) {
    var sourcePath = args[0] || 'Src/';
    var cli = new ESLintCLI(eslintConfig);
    var report = cli.executeOnFiles([sourcePath]);
    var hasESLintWarnings = report.warningCount > 0;
    var hasESLintErrors = report.errorCount > 0;

    if(hasESLintErrors) {
        console.log(clc.red('ESLint has found one or more errors:'));
    }

    if(hasESLintWarnings) {
        console.log(clc.yellow('ESLint has found one or more warnings:'));
    }

    if(hasESLintErrors || hasESLintWarnings) {
        report.results.forEach(esLintLogger);
    }
};