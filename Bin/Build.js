#! /usr/bin/env node

var umd = require('umd');
var babel = require('babel');
var uglify = require('uglify-files');
var getFileContents = require('./../Utilities/GetFileContents.js');
var writeFile = require('./../Utilities/WriteFile.js');
var cwd = process.cwd();
var metaData = require(cwd + '/package.json');

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
        var umdCode = umd(packageName, code);

        if(umdCode) {
            resolve(umdCode);
        } else {
            reject();
        }
    });
}

function addBanner(code) {
    var versionArray = metaData.version.split('.');
    var banner = `/* ${metaData.name} ${versionArray[0]}.${versionArray[1]}.${versionArray[2]} | @license ${metaData.license.type} */

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

module.exports = (args) => {
    var packageName = args[0] || 'default';
    var srcPath = args[1] || 'Src/';
    var distPath = args[2] || 'Dist/';
    var fileName = args[3] || 'MyFile';

    getFileContents(srcPath + fileName).then((code) => {
        return umdify(packageName, code);
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
    })
};
