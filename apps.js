var fs = require('fs'),
    path = require('path'),
    storage = require('./storage');
    apps = {};

// Loop through node_modules searching for apps with smarttv.json
var npmDir = path.join(__dirname, 'node_modules');
var modules = fs.readdirSync(npmDir);
modules.forEach(function(mod) {
    var ls = fs.readdirSync(path.join(npmDir, mod));
    if (ls.indexOf('smarttv.json') !== -1) {
        apps[mod] = require(path.join(npmDir, mod, 'smarttv.json'));
    }
});

storage.data.currentApp = storage.data.mainApp;

module.exports = apps;
