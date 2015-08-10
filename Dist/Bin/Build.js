#! /usr/bin/env node
'use strict';

var babel = require('babel');
var uglify = require('uglify-files');
var clc = require('cli-color');
var getFileContents = require('./../Utilities/GetFileContents.js');
var writeFile = require('./../Utilities/WriteFile.js');
var metaData = require('./../Utilities/MetaData.js');

var NAMESPACE_PREFIX = 'reduct';

/**
 * Transpiles the code string argument with babel.
 *
 * @param code {String} The code to transpile.
 * @returns {Promise}
 *
 */
function transpileWithBabel(code, globalPackageName) {
    return new Promise(function (resolve, reject) {
        var result = babel.transform(code, {
            modules: 'umd',
            moduleId: NAMESPACE_PREFIX + '.' + globalPackageName
        });

        if (result.code) {
            resolve(result.code);
        } else {
            reject();
        }
    });
}

/**
 * Adds a file-banner to the code with detailed meta data about the package.
 *
 * @param code {String} the code which will be prepended after the file banner.
 * @returns {Promise}
 */
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

        contributorCommentList += '@author ' + contributor.name + (contributor.email ? ' <' + contributor.email + '>' : '');
    });

    banner = '/**\n *\n * @name ' + metaData.packageName + '\n * @version ' + version.major + '.' + version.minor + '.' + version.patch + '\n * @license ' + metaData.licenseType + '\n *\n * ' + contributorCommentList + '\n *\n */\n\n';

    banneredCode = banner + code;

    return Promise.resolve(banneredCode);
}

/**
 * Creates a uglyfied version of the file described in the arguments.
 *
 * @param filePath {String} The path to the file which should get a duplicate uglyfied version.
 * @returns {Promise}
 */
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
        console.log('Transpiling the source code with babel...');

        return transpileWithBabel(code, globalPackageName);
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