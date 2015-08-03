var eslint = require('eslint');
var clc = require('cli-color');
var ESLintCLI = eslint.CLIEngine;
var cwd = process.cwd();

class ESLintRunner {
    /**
     * Instantiates a runner of the ESLint CLI on the given path.
     *
     * @param path {String} The path on which ESLint will be applied on.
     */
    constructor(path) {
        this.runner = new ESLintCLI({
            reset: true,

            // ToDo: Absolute paths shouldn't be used.
            configFile: cwd + '/node_modules/@reduct/build-tools/.eslintrc'
        });
        this.report = this.runner.executeOnFiles([path]);
    }

    /**
     * Kicks of the linting process and logs all errors/warning to the console.
     *
     * @returns {Promise}
     */
    lint() {
        var report = this.report;
        var hasESLintWarnings = report.warningCount > 0;
        var hasESLintErrors = report.errorCount > 0;

        return new Promise((resolve, reject) => {
            console.log(clc.underline('Linting all files via ESLint...'));

            if (hasESLintErrors) {
                console.log(clc.red('ESLint has found one or more errors:\n'));
            }

            if (hasESLintWarnings) {
                console.log(clc.yellow('ESLint has found one or more warnings:\n'));
            }

            if (hasESLintErrors || hasESLintWarnings) {
                report.results.forEach(this.logResultForFile.bind(this));
            }

            if (hasESLintErrors) {
                reject();
            } else {
                console.log(clc.green('\nESLint results are good!\n'));

                resolve();
            }
        });
    }

    /**
     * Splits up the result of one file.
     *
     * @param result {Object} THe object containing the results of the file.
     */
    logResultForFile(result) {
        console.log(clc.underline(result.filePath));

        result.messages.forEach(this.logViolation.bind(this));
    }

    /**
     * Logs a violation of a file.
     *
     * @param violation {Object} The violation object containing the details.
     */
    logViolation(violation) {
        var isFatal = violation.fatal;
        var color = isFatal ? clc.red : clc.yellow;
        var messagePrefix = isFatal ? 'Error' : 'Warning';

        console.log(color(messagePrefix + ' on line ' + violation.line + ' column ' + violation.column + ':'), violation.message);
    }
}

module.exports = ESLintRunner;
