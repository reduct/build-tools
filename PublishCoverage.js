var exec = require('child_process').exec;
var lcovFilePath = process.argv[3];

if(lcovFilePath) {
    exec('cat ' + lcovFilePath + ' | codeclimate', function (err) {
        if (err) {
            throw err;
        }
    });
} else {
    console.info('Please specify an coverage file to publish as an argument while running "node PublishCoverage.js".');
}



