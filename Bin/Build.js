#! /usr/bin/env node

var UMDWrapper = require('./../Lib/UMDWrapper.js');
var babel = require('babel');
var uglify = require('uglify-files');
var getFileContents = require('./../Utilities/GetFileContents.js');
var writeFile = require('./../Utilities/WriteFile.js');
var metaData = require('./../Utilities/MetaData.js');

function transpileWithBabel(code) {
    return new Promise((resolve, reject) => {
        var result = babel.transform(code);

        if(result.code) {
            resolve(result.code);
        } else {
            reject();
        }
    });
}

function umdify(packageName, code) {
    return new Promise((resolve, reject) => {
        var umdWrapperInstance = new UMDWrapper(packageName, code, metaData.version);

        umdWrapperInstance.getWrappedCode().then((umdCode) => {
            resolve(umdCode);
        }).catch(() => {
            reject();
        });
    });
}

function addBanner(code) {
    var version = metaData.version;
    var banner = `/* ${metaData.packageName} ${version.major}.${version.minor}.${version.patch} | @license ${metaData.licenseType} */

`;
    var banneredCode = banner + code;

    return Promise.resolve(banneredCode);
}

function uglifyFile(filePath) {
    var sourceFile = filePath;
    var targetFile = filePath.replace('.js', '.min.js');

    return new Promise((resolve, reject) => {
        uglify(sourceFile, targetFile, function(err, result) {
            if(err) {
                reject(err);
            }

            resolve();
        });
    });
}

module.exports = () => {
    var globalPackageName = metaData.globalPackageName;
    var srcPath = metaData.paths.src;
    var distPath = metaData.paths.dist;
    var fileName = metaData.entryFile;

    return getFileContents(srcPath + fileName).then((code) => {
        return umdify(globalPackageName, code);
    }).then((code) => {
        return transpileWithBabel(code);
    }).then((code) => {
        return addBanner(code);
    }).then((code) => {
        return writeFile(distPath + fileName, code);
    }).then((filePath) => {
        return uglifyFile(filePath);
    }).catch((err) => {
        console.log(err);
        process.exit(1);
    });
};
