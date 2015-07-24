#! /usr/bin/env node

var publishCoverage = require('./PublishCoverage.js');
var userArgs = process.argv.slice(2);
var taskArgs = userArgs.slice(1);
var type = userArgs[0] || 'build';

switch(type) {
    case 'publish-coverage':
        publishCoverage(taskArgs);

        break;

    default:
        // ToDo
        break;
}