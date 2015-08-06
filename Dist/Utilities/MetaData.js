'use strict';

var singleton = null;
var requiredKeyValuePairs = ['sourceFolder', 'distributionFolder', 'entryFile', 'globalPackageName', 'coverageReportFile'];

/**
 * Acts as a centralised model containing all information about the target package.
 *
 * @returns {{
 *  packageName: String,
 *  version: {
 *      major: Number,
 *      minor: Number,
 *      patch: Number
 *  },
 *  licenseType: String,
 *  contributors: (Array),
 *  paths: {
 *      src: String,
 *      dist: String
 *  },
 *  entryFile: String,
 *  globalPackageName: String,
 *  coverageReportFile: String
 * }}
 * @constructor
 */
function GetMetaData() {
    var cwd = process.cwd();
    var metaData = require(cwd + '/package.json');
    var config = metaData.reduct;
    var versionArray = metaData.version.split('.');

    if (!config) {
        console.log('No reduct config was found in your package.json: ', metaData);

        throw new Error('@reduct/build-tools: Something went wrong while getting the metaData - Details are posted above.');
    }

    requiredKeyValuePairs.forEach(function (requiredkey) {
        if (!config[requiredkey]) {
            console.log('Please specify a reduct.' + requiredkey + ' value in your package.json: ', metaData);

            throw new Error('@reduct/build-tools: Something went wrong while getting the metaData - Details are posted above.');
        }
    });

    this.data = {
        packageName: metaData.name,
        version: {
            major: versionArray[0],
            minor: versionArray[1],
            patch: versionArray[2]
        },
        licenseType: metaData.license.type,
        contributors: metaData.contributors || [],
        paths: {
            src: config.sourceFolder,
            dist: config.distributionFolder
        },
        entryFile: config.entryFile,
        globalPackageName: config.globalPackageName
    };

    return this.data;
}

module.exports = (function exportAPI() {
    return singleton || (singleton = new GetMetaData());
})();