var path = require('path');
var fs = require('fs');

module.exports = function getFiles(startPath, filter, callback) {
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
};
