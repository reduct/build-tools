var fs = require('fs');

/**
 * Writes a file to the given path with the given contents.
 *
 * @param filePath {String} The target path where the file will be written in.
 * @param contents {String} The contents of the file.
 * @returns {Promise}
 */
function getFileContents (filePath, contents) {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, contents, (err) => {
            if (err) {
                reject(err);
            }

            resolve(filePath, contents);
        });
    });
}

module.exports = getFileContents;
