var fs = require('fs'),
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
    fs.writeFile('../data.json', JSON.stringify(data), cb);
}
