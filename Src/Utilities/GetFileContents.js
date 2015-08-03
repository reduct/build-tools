var fs = require('fs');

/**
 * Returns the contents of a file.
 *
 * @param filePath {String} The path to the file.
 * @returns {Promise}
 */
function getFileContents (filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            }

            resolve(data);
        });
    });
}

module.exports = getFileContents;
