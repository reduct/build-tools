'use strict';

var fs = require('fs');

function getFileContents(filePath, contents) {
    return new Promise(function (resolve, reject) {
        fs.writeFile(filePath, contents, function (err) {
            if (err) {
                reject(err);
            }

            resolve(filePath, contents);
        });
    });
}

module.exports = getFileContents;