#! /usr/bin/env node
'use strict';

var babel = require('babel');
var uglify = require('uglify-files');
var clc = require('cli-color');
var UMDWrapper = require('./../Lib/UMDWrapper.js');
var getFileContents = require('./../Utilities/GetFileContents.js');
var writeFile = require('./../Utilities/WriteFile.js');
var metaData = require('./../Utilities/MetaData.js');

function transpileWithBabel(code) {
    return new Promise(function (resolve, reject) {
        var result = babel.transform(code);

        if (result.code) {
            resolve(result.code);
        } else {
            reject();
        }
    });
}

function umdify(packageName, code) {
    return new Promise(function (resolve, reject) {
        var umdWrapperInstance = new UMDWrapper(packageName, code, metaData.version);

        umdWrapperInstance.getWrappedCode().then(function (umdCode) {
            resolve(umdCode);
        })['catch'](function () {
            reject();
        });
    });
}

function addBanner(code) {
    var version = metaData.version;
    var contributors = metaData.contributors;
    var contributorCommentList = '';
    var banneredCode = undefined;
    var banner = undefined;

    contributors.forEach(function (contributor, index) {
        if (index !== 0) {
            contributorCommentList += '\n * ';
        }

        contributorCommentList += '@author ' + contributor.name + ' <' + contributor.name + '>';
    });

    banner = '/**\n *\n * @name ' + metaData.packageName + '\n * @version ' + version.major + '.' + version.minor + '.' + version.patch + '\n * @license ' + metaData.licenseType + '\n *\n * ' + contributorCommentList + '\n *\n */\n\n';
    console.log(banner);
    banneredCode = banner + code;

    return Promise.resolve(banneredCode);
}

function uglifyFile(filePath) {
    var sourceFile = filePath;
    var targetFile = filePath.replace('.js', '.min.js');

    return new Promise(function (resolve, reject) {
        uglify(sourceFile, targetFile, function (err) {
            if (err) {
                reject(err);
            }

            resolve();
        });
    });
}

module.exports = function () {
    var globalPackageName = metaData.globalPackageName;
    var srcPath = metaData.paths.src;
    var distPath = metaData.paths.dist;
    var fileName = metaData.entryFile;

    console.log(clc.underline('Building the source files...'));

    return getFileContents(srcPath + fileName).then(function (code) {
        console.log('Wrapping the UMD IIFE around the source file...');

        return umdify(globalPackageName, code);
    }).then(function (code) {
        console.log('Transpiling the source code with babel...');

        return transpileWithBabel(code);
    }).then(function (code) {
        console.log('Adding the meta data file banner with...');

        return addBanner(code);
    }).then(function (code) {
        return writeFile(distPath + fileName, code);
    }).then(function (filePath) {
        console.log('Creating a minfied version of the final build...');

        return uglifyFile(filePath);
    }).then(function () {
        console.log(clc.green('\nSuccessfully completed the build task.\n'));
    })['catch'](function (err) {
        console.log(err);

        throw new Error('@reduct/build-tools: Something went wrong while running the build task.');
    });
};