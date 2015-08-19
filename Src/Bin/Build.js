#! /usr/bin/env node

var babel = require('babel');
var uglify = require('uglify-files');
var clc = require('cli-color');
var UMDWrapper = require('./../Lib/UMDWrapper.js');
var getFileContents = require('./../Utilities/GetFileContents.js');
var writeFile = require('./../Utilities/WriteFile.js');
var metaData = require('./../Utilities/MetaData.js');

/**
 * Transpiles the code string argument with babel.
 *
 * @param code {String} The code to transpile.
 * @returns {Promise}
 *
 */
function transpileWithBabel (code) {
    return new Promise((resolve, reject) => {
        var result = babel.transform(code, {
            stage: 0
        });

        if (result.code) {
            resolve(result.code);
        } else {
            reject();
        }
    });
}

/**
 * Adds a UMD wrapper around the code to expose it for all package systems.
 *
 * @param packageName {String} The global package name under which the package will be saved under.
 * @param code {String} The code of the factory function which gets wrapped.
 * @returns {Promise}
 *
 */
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

/**
 * Adds a file-banner to the code with detailed meta data about the package.
 *
 * @param code {String} the code which will be prepended after the file banner.
 * @returns {Promise}
 */
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

        contributorCommentList += `@author ${contributor.name}${contributor.email ? ` <${contributor.email}>` : '' }`;
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

/**
 * Creates a uglyfied version of the file described in the arguments.
 *
 * @param filePath {String} The path to the file which should get a duplicate uglyfied version.
 * @returns {Promise}
 */
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
