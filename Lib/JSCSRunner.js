var jscs = require('buenos-jscs');

function JSCSRunner(path) {
    this.path = path + '**/*.js';
    this.runner = null;
}
JSCSRunner.prototype.lint = function() {
    this.runner = new jscs({
        src: [this.path],
        jscsConfig: './node_modules/shared-build/.jscsrc'
    });

    this.runner.promise.then(function(log) {
    });
};

module.exports = JSCSRunner;