#! /usr/bin/env node

var babel = require("babel/register");
var publishCoverage = require('./PublishCoverage.js');
var build = require('./Build.js');
var lint = require('./Lint.js');
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

    default:
        lint().then(function() {
            return build();
        });

        break;
}
