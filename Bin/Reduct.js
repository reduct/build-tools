#! /usr/bin/env node

var babel = require("babel/register");
var publishCoverage = require('./PublishCoverage.js');
var lint = require('./Lint.js');
var userArgs = process.argv.slice(2);
var taskArgs = userArgs.slice(1);
var type = userArgs[0] || 'build';

switch(type) {
    case 'lint':
        lint(taskArgs);

        break;

    case 'publish-coverage':
        publishCoverage(taskArgs);

        break;

    default:
        // ToDo
        break;
}
