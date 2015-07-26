var path = require('path');
var fs = require('fs');

module.exports = function getFiles(startPath, filter, callback){
    var files = fs.readdirSync(startPath);

    for(var i = 0; i < files.length; i++){
        var filename = path.join(startPath,files[i]);
        var stat = fs.lstatSync(filename);

        if (stat.isDirectory()) {
            getFiles(filename, filter, callback);
        } else if (filename.indexOf(filter) > -1) {
            callback(filename);
        }
    }
};