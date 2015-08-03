#! /usr/bin/env node

var babel = require('babel');
var uglify = require('uglify-files');
var clc = require('cli-color');
var UMDWrapper = require('./../Lib/UMDWrapper.js');
var getFileContents = require('./../Utilities/GetFileContents.js');
var writeFile = require('./../Utilities/WriteFile.js');
var metaData = require('./../Utilities/MetaData.js');

function transpileWithBabel (code) {
    return new Promise((resolve, reject) => {
        var result = babel.transform(code);

        if (result.code) {
            resolve(result.code);
        } else {
            reject();
        }
    });
}

function umdify (packageName, code) {
    return new Promise((resolve, reject) => {
        var umdWrapperInstance = new UMDWrapper(packageName, code, metaData.version);

        umdWrapperInstance.getWrappedCode().then((umdCode) => {
            resolve(umdCode);
        }).catch(() => {
            reject();
        });
    });
}

function addBanner (code) {
    const version = metaData.version;
    const contributors = metaData.contributors;
    let contributorCommentList = '';
    let banneredCode;
    let banner;

    contributors.forEach((contributor, index) => {
        if (index !== 0) {
            contributorCommentList += '\n * ';
        }

        contributorCommentList += `@author ${contributor.name} <${contributor.email}>`;
    });

    banner = `/**
 *
 * @name ${metaData.packageName}
 * @version ${version.major}.${version.minor}.${version.patch}
 * @license ${metaData.licenseType}
 *
 * ${contributorCommentList}
 *
 */

`;

    banneredCode = banner + code;

    return Promise.resolve(banneredCode);
}

function uglifyFile (filePath) {
    var sourceFile = filePath;
    var targetFile = filePath.replace('.js', '.min.js');

    return new Promise((resolve, reject) => {
        uglify(sourceFile, targetFile, (err) => {
            if (err) {
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

    console.log(clc.underline('Building the source files...'));

    return getFileContents(srcPath + fileName).then((code) => {
        console.log('Wrapping the UMD IIFE around the source file...');

        return umdify(globalPackageName, code);
    }).then((code) => {
        console.log('Transpiling the source code with babel...');

        return transpileWithBabel(code);
    }).then((code) => {
        console.log('Adding the meta data file banner with...');

        return addBanner(code);
    }).then((code) => {
        return writeFile(distPath + fileName, code);
    }).then((filePath) => {
        console.log('Creating a minfied version of the final build...');

        return uglifyFile(filePath);
    }).then(() => {
        console.log(clc.green('\nSuccessfully completed the build task.\n'));
    }).catch((err) => {
        console.log(err);

        throw new Error('@reduct/build-tools: Something went wrong while running the build task.');
    });
};
