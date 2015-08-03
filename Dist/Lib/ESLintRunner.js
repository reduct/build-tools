'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var eslint = require('eslint');
var clc = require('cli-color');
var ESLintCLI = eslint.CLIEngine;
var cwd = process.cwd();

var ESLintRunner = (function () {
    /**
     * Instantiates a runner of the ESLint CLI on the given path.
     *
     * @param path {String} The path on which ESLint will be applied on.
     */

    function ESLintRunner(path) {
        _classCallCheck(this, ESLintRunner);

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

    _createClass(ESLintRunner, [{
        key: 'lint',
        value: function lint() {
            var _this = this;

            var report = this.report;
            var hasESLintWarnings = report.warningCount > 0;
            var hasESLintErrors = report.errorCount > 0;

            return new Promise(function (resolve, reject) {
                console.log(clc.underline('Linting all files via ESLint...'));

                if (hasESLintErrors) {
                    console.log(clc.red('ESLint has found one or more errors:\n'));
                }

                if (hasESLintWarnings) {
                    console.log(clc.yellow('ESLint has found one or more warnings:\n'));
                }

                if (hasESLintErrors || hasESLintWarnings) {
                    report.results.forEach(_this.logResultForFile.bind(_this));
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
    }, {
        key: 'logResultForFile',
        value: function logResultForFile(result) {
            console.log(clc.underline(result.filePath));

            result.messages.forEach(this.logViolation.bind(this));
        }

        /**
         * Logs a violation of a file.
         *
         * @param violation {Object} The violation object containing the details.
         */
    }, {
        key: 'logViolation',
        value: function logViolation(violation) {
            var isFatal = violation.fatal;
            var color = isFatal ? clc.red : clc.yellow;
            var messagePrefix = isFatal ? 'Error' : 'Warning';

            console.log(color(messagePrefix + ' on line ' + violation.line + ' column ' + violation.column + ':'), violation.message);
        }
    }]);

    return ESLintRunner;
})();

module.exports = ESLintRunner;