var fs = require('fs'),
    path = require('path'),
    electron = require('./electron'),
    apps = {};

var currentApp = process.env.npm_package_config_main_app;

// Loop through node_modules searching for apps with smarttv.json
var npmDir = path.join(__dirname, 'node_modules');
var modules = fs.readdirSync(npmDir);
modules.forEach(function(mod) {
    var ls = fs.readdirSync(path.join(npmDir, mod));
    if (ls.indexOf('smarttv.json') !== -1) {
        apps[mod.replace(/^smarttv-/, '')] = require(
            path.join(npmDir, mod, 'smarttv.json')
        );
    }
});

electron.onReady = function() {
    showApp(currentApp);
};

exports.list = apps;
exports.show = showApp;
exports.getCurrent = getCurrent;

function showApp(app) {
    currentApp = app;
    electron.mainWindow.loadURL(
        apps[app].url ||
        'file://' + path.join(
            __dirname,
            'node_modules',
            'smarttv-' + app,
            'index.html'
        )
    );
}

function getCurrent() {
    return currentApp;
}
