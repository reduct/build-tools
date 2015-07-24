#! /usr/bin/env node

var userArgs = process.argv.slice(2);
var type = userArgs[0] || 'build';
var publishCoverage = require('./PublishCoverage.js');

switch(type) {
    case 'publish-coverage':
        publishCoverage(userArgs[1]);

        break;

    default:
        // ToDo
        break;
}