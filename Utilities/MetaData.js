var singleton = null;
var requiredKeyValuePairs = [
    'sourceFolder',
    'distributionFolder',
    'entryFile',
    'globalPackageName',
    'coverageReportFile'
];

function GetMetaData() {
    var cwd = process.cwd();
    var metaData = require(cwd + '/package.json');
    var config = metaData.reduct;

    if(!config) {
        console.log('No reduct config was found in your package.json: ', metaData);

        process.exit(1);
    }

    requiredKeyValuePairs.forEach((requiredkey) => {
        if(!config[requiredkey]) {
            console.log(`Please specify a reduct.${requiredkey} value in your package.json: `, metaData);

            process.exit(1);
        }
    });

    return this.data = {
        packageName: metaData.name,
        version: metaData.version,
        licenseType: metaData.license.type,
        paths: {
            src: config.sourceFolder,
            dist: config.distributionFolder
        },
        entryFile: config.entryFile,
        globalPackageName: config.globalPackageName,
        coverageReportFile: config.coverageReportFile
    };
}

module.exports = (function() {
    return singleton || (singleton = new GetMetaData());
}());