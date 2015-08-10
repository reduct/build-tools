#! /usr/bin/env node
'use strict';

var publishCoverage = require('./PublishCoverage.js');
var build = require('./Build.js');
var lint = require('./Lint.js');
var test = require('./Test.js');
var userArgs = process.argv.slice(2);
var taskType = userArgs[0];

require('babel/polyfill');

// Define a custom process title for additional behavior in tests etc.
process.title = 'reduct';

function onError(err) {
    console.log(err);

    throw new Error('@reduct/build-tools: Something went wrong - Details are posted above.');
}

switch (taskType) {
    case 'lint':
        lint()['catch'](onError);

        break;

    case 'publish-coverage':
        publishCoverage()['catch'](onError);

        break;

    case 'build':
        build()['catch'](onError);

        break;

    case 'mocha':
        test()['catch'](onError);

        break;

    case 'test':
        lint().then(function () {
            return test();
        })['catch'](onError);

        break;

    default:
        lint().then(function () {
            return build();
        }).then(function () {
            return test();
        })['catch'](onError);

        break;
}