var JSCS = require('buenos-jscs');
var clc = require('cli-color');
var cwd = process.cwd();

class JSCSRunner {
    constructor(path) {
        this.path = path + '**/*.js';
        this.runner = null;
    }

    lint() {
        this.runner = new JSCS({
            src: [this.path],
            jscsConfig: cwd + '/node_modules/@reduct/build-tools/.jscsrc'
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
                    console.log(clc.green('JSCS results are good!'));

                    resolve();
                }
            });
        });
    }

    logResultForFile(fileName, result) {
        if (result.errorCount) {
            console.log(clc.underline(fileName));

            result.errors.forEach(this.logViolation.bind(this));
        }
    }

    logViolation(violation) {
        let prelude = clc.red('Style violation on line ' + violation.line + ' column ' + violation.column + ':');
        console.log(prelude, violation.rule + ' ' + violation.message);
    }
}

module.exports = JSCSRunner;
