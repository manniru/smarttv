var fs = require('fs'),
    path = require('path'),
    data;

try {
    data = require('../data.json');
} catch(e) {
    data = require('../data.default.json');
    save();
}

exports.data = data;
exports.save = save;

function save(cb) {
    return fs.writeFile(
        path.join(__dirname, '../data.json'),
        JSON.stringify(data),
        cb
    );
}
