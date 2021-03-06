var JSCS = require('buenos-jscs');
var clc = require('cli-color');
var cwd = process.cwd();

class JSCSRunner {
    /**
     * Instantiates a runner of Buenos-JSCS on the given path.
     *
     * @param path {String} The path on which JSCS will be applied on.
     */
    constructor(path) {
        this.path = path + '**/*.js';
        this.runner = null;
    }

    /**
     * Kicks of the linting process and logs all errors/warning to the console.
     *
     * @returns {Promise}
     */
    lint() {
        this.runner = new JSCS({
            src: [this.path],
            jscsConfig: cwd + '/node_modules/@reduct/build-tools/.jscsrc',
            reporters: null
        });

        console.log(clc.underline('Checking the code style via JSCS...'));

        return new Promise((resolve, reject) => {
            this.runner.promise.then((log) => {
                let errors = log.files;

                if (log.failureCount > 0) {
                    console.log(clc.red('JSCS has found one or more errors:\n'));
                }

                for (let fileName in errors) {
                    if (errors.hasOwnProperty(fileName)) {
                        let result = errors[fileName];

                        this.logResultForFile(fileName, result);
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
    logResultForFile(fileName, result) {
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
    logViolation(violation) {
        let prelude = clc.red('Style violation on line ' + violation.line + ' column ' + violation.column + ':');

        console.log(prelude, violation.rule + ' ' + violation.message);
    }
}

module.exports = JSCSRunner;
