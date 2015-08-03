var path = require('path');
var fs = require('fs');

/**
 * Get files recursively of a directory with an specified file name filter.
 *
 * @param startPath {String} The directory to start on.
 * @param filter {String} The filter which the files should have in their file name.
 * @param callback {Function} The callback which gets executed on each found file.
 */
function getFiles (startPath, filter, callback) {
    var files = fs.readdirSync(startPath);

    for (let i = 0; i < files.length; i++) {
        let filename = path.join(startPath, files[i]);
        let stat = fs.lstatSync(filename);

        if (stat.isDirectory()) {
            getFiles(filename, filter, callback);
        } else if (filename.indexOf(filter) > -1) {
            callback(filename);
        }
    }
}

module.exports = getFiles;
