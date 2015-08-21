#! /usr/bin/env node
'use strict';

var babelify = require('babelify');
var browserify = require('browserify');
var derequire = require('derequire');
var uglify = require('uglify-files');
var clc = require('cli-color');
var IIFEWrapper = require('./../Lib/IIFEWrapper.js');
var getFileContents = require('./../Utilities/GetFileContents.js');
var writeFile = require('./../Utilities/WriteFile.js');
var metaData = require('./../Utilities/MetaData.js');

/**
 * Bundles all dependencies via browserify and transforms the code from ESXXX to ES3 via babelify.
 *
 * @param opts {Object} Contains the path to the entry file and the global package name.
 * @returns {Promise}
 *
 */
function bundleDependencies(opts) {
    var b = browserify(opts.entry, {
        standalone: opts.globalPackageName
    });

    b.transform(babelify, {
        stage: 0
    });

    return new Promise(function (resolve, reject) {
        b.bundle(function (err, buffer) {
            if (err) {
                reject(err);
            } else {
                resolve(buffer.toString('utf8'));
            }
        });
    });
}

/**
 * Replaces all instances of the require() statement to _dereq_().
 *
 * @param code {String} The string to derequire.
 * @returns {Promise}
 *
 */
function derequireCode(code) {
    var transformedCode = derequire(code, [{
        from: 'require',
        to: '_dereq_'
    }]);

    return Promise.resolve(transformedCode);
}

/**
 * Adds a UMD wrapper around the code to expose it for all package systems.
 *
 * @param code {String} The code of the factory function which gets wrapped.
 * @returns {Promise}
 *
 */
function iifeify(code) {
    return new Promise(function (resolve, reject) {
        var umdWrapperInstance = new IIFEWrapper(code, metaData.version);

        umdWrapperInstance.getWrappedCode().then(function (umdCode) {
            resolve(umdCode);
        })['catch'](function () {
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

    console.log('Bundling all dependencies via browserify...');
    return bundleDependencies({
        entry: srcPath + fileName,
        globalPackageName: globalPackageName
    }).then(function (code) {
        console.log('Replacing all instances of require() class with _dereq_()...');

        return derequireCode(code);
    }).then(function (code) {
        console.log('Wrapping the IIFE around the bundled source file...');

        return iifeify(code);
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