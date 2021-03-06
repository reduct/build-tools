'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var JSCS = require('buenos-jscs');
var clc = require('cli-color');
var cwd = process.cwd();

var JSCSRunner = (function () {
    /**
     * Instantiates a runner of Buenos-JSCS on the given path.
     *
     * @param path {String} The path on which JSCS will be applied on.
     */

    function JSCSRunner(path) {
        _classCallCheck(this, JSCSRunner);

        this.path = path + '**/*.js';
        this.runner = null;
    }

    /**
     * Kicks of the linting process and logs all errors/warning to the console.
     *
     * @returns {Promise}
     */

    _createClass(JSCSRunner, [{
        key: 'lint',
        value: function lint() {
            var _this = this;

            this.runner = new JSCS({
                src: [this.path],
                jscsConfig: cwd + '/node_modules/@reduct/build-tools/.jscsrc',
                reporters: null
            });

            console.log(clc.underline('Checking the code style via JSCS...'));

            return new Promise(function (resolve, reject) {
                _this.runner.promise.then(function (log) {
                    var errors = log.files;

                    if (log.failureCount > 0) {
                        console.log(clc.red('JSCS has found one or more errors:\n'));
                    }

                    for (var fileName in errors) {
                        if (errors.hasOwnProperty(fileName)) {
                            var result = errors[fileName];

                            _this.logResultForFile(fileName, result);
                        }
                    }

                    if (log.failureCount > 0) {
                        reject();
                    } else {
                        console.log(clc.green('\nJSCS results are good!\n'));

                        resolve();
                    }

                    console.log('');
                });
            });
        }

        /**
         * Splits up the result of one file.
         *
         * @param fileName {String} The name of the current file result.
         * @param result {Object} THe object containing the results of the file.
         */
    }, {
        key: 'logResultForFile',
        value: function logResultForFile(fileName, result) {
            if (result.errorCount) {
                console.log(clc.underline(fileName));

                result.errors.forEach(this.logViolation.bind(this));
            }
        }

        /**
         * Logs a violation of a file.
         *
         * @param violation {Object} The violation object containing the details.
         */
    }, {
        key: 'logViolation',
        value: function logViolation(violation) {
            var prelude = clc.red('Style violation on line ' + violation.line + ' column ' + violation.column + ':');

            console.log(prelude, violation.rule + ' ' + violation.message);
        }
    }]);

    return JSCSRunner;
})();

module.exports = JSCSRunner;