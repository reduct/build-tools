var fs = require('fs');

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