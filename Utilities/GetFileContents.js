var fs = require('fs');

function getFileContents(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', function (err,data) {
            if (err) {
                reject(err);
            }

            resolve(data);
        });
    })
}

module.exports = getFileContents;