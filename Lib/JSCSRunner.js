var jscs = require('buenos-jscs');
var clc = require('cli-color');

function JSCSRunner(path) {
    this.path = path + '**/*.js';
    this.runner = null;
}
JSCSRunner.prototype.lint = function() {
    this.runner = new jscs({
        src: [this.path],
        jscsConfig: './node_modules/shared-build/.jscsrc'
    });

    console.log(clc.underline('Checking the code style via JSCS...'));

    this.runner.promise.then(function(log) {
        var errors = log.files;

        if(log.failureCount > 0) {
            console.log(clc.red('JSCS has found one or more errors:\n'));
        }

        for (var fileName in errors) {
            if (errors.hasOwnProperty(fileName)) {
                var result = errors[fileName];

                this.logResultForFile(fileName, result);
            }
        }
    }.bind(this));
};
JSCSRunner.prototype.logResultForFile = function(fileName, result) {
    console.log(clc.underline(fileName));

    result.errors.forEach(this.logViolations.bind(this));
};
JSCSRunner.prototype.logViolations = function(violation) {
    console.log(clc.red('Style violation on line ' + violation.line + ' column ' + violation.column + ':'), violation.rule + ' ' + violation.message);
};

module.exports = JSCSRunner;