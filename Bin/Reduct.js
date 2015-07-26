#! /usr/bin/env node

var babel = require("babel/register");
var publishCoverage = require('./PublishCoverage.js');
var build = require('./Build.js');
var lint = require('./Lint.js');
var test = require('./Test.js');
var userArgs = process.argv.slice(2);
var taskType = userArgs[0];

function onError(err) {
    console.log(err)
    process.exit(1);
}

switch(taskType) {
    case 'lint':
        lint().catch(onError);

        break;

    case 'publish-coverage':
        publishCoverage().catch(onError);

        break;

    case 'build':
        build().catch(onError);

        break;

    case 'mocha':
        test().catch(onError);

        break;

    case 'test':
        lint().then(function() {
            return test();
        }).catch(onError);

        break;

    default:
        lint().then(function() {
            return test();
        }).then(function() {
            return build();
        }).catch(onError);

        break;
}
