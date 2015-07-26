#! /usr/bin/env node

var babel = require("babel/register");
var publishCoverage = require('./PublishCoverage.js');
var build = require('./Build.js');
var lint = require('./Lint.js');
var test = require('./Test.js');
var userArgs = process.argv.slice(2);
var taskType = userArgs[0];

switch(taskType) {
    case 'lint':
        lint();

        break;

    case 'publish-coverage':
        publishCoverage();

        break;

    case 'build':
        build();

        break;

    case 'mocha':
        test();

        break;

    case 'test':
        lint().then(function() {
            test();
        });

        break;

    default:
        lint().then(function() {
            return test();
        }).then(function() {
            return build();
        });

        break;
}
