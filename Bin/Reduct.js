#! /usr/bin/env node

var babel = require("babel/register");
var publishCoverage = require('./PublishCoverage.js');
var build = require('./Build.js');
var lint = require('./Lint.js');
var userArgs = process.argv.slice(2);
var taskArgs = userArgs.slice(1);
var taskType = userArgs[0];

switch(taskType) {
    case 'lint':
        lint(taskArgs);

        break;

    case 'publish-coverage':
        publishCoverage(taskArgs);

        break;

    case 'build':
        build(taskArgs);

        break;

    default:
        // ToDo
        break;
}
