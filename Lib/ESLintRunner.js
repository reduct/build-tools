var eslint = require('eslint');
var clc = require('cli-color');
var ESLintCLI = eslint.CLIEngine;

function ESLintRunner(path) {
    this.runner = new ESLintCLI({
        reset: true,
        // ToDo: Absolute paths shouldn't be used.
        configFile: 'node_modules/shared-build/.eslintrc'
    });
    this.report = this.runner.executeOnFiles([path]);
}
ESLintRunner.prototype.lint = function() {
    var report = this.report;
    var hasESLintWarnings = report.warningCount > 0;
    var hasESLintErrors = report.errorCount > 0;

    console.log(clc.underline('Linting all files via ESLint...'));

    if(hasESLintErrors) {
        console.log(clc.red('ESLint has found one or more errors:\n'));
    }

    if(hasESLintWarnings) {
        console.log(clc.yellow('ESLint has found one or more warnings:\n'));
    }

    if(hasESLintErrors || hasESLintWarnings) {
        report.results.forEach(this.logResultForFile.bind(this));
    }
};
ESLintRunner.prototype.logResultForFile = function(result) {
    console.log(clc.underline(result.filePath));

    result.messages.forEach(this.logViolations.bind(this));
};
ESLintRunner.prototype.logViolations = function(message) {
    var isFatal = message.fatal;
    var color = isFatal ? clc.red : clc.yellow;
    var messagePrefix = isFatal ? 'Error' : 'Warning';

    console.log(color(messagePrefix + ' on line ' + message.line + ' column ' + message.column + ':'), message.message);
};

module.exports = ESLintRunner;