var fs = require('fs'),
    path = require('path'),
    electron = require('./webapp'),
    apps = {};

var currentApp = process.env.npm_package_config_main_app;

// Loop through node_modules searching for apps with smarttv.json
var home = process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
var appDir = home + '/.smarttv/apps';
try{
  console.log('Loading apps...');
  var modules = fs.readdirSync(appDir);
} catch(e) {
  console.log('.smarttv/apps/ dir not found, creating...');
  try {
    fs.mkdirSync(home + '/.smarttv');
  } catch(e) {}
  try {
    fs.mkdirSync(appDir);
  } catch(e) {}
  var modules = fs.readdirSync(appDir);
}
modules.forEach(function(mod) {
    var ls = fs.readdirSync(path.join(appDir, mod));
    if (ls.indexOf('smarttv.json') !== -1) {
        var app = require(path.join(appDir, mod, 'smarttv.json'));
        apps[mod] = app;
    }
});

electron.onReady = function() {
    showApp(currentApp);
};

exports.list = apps;
exports.show = showApp;
exports.getCurrent = getCurrent;
exports.getMain = getMain;

function showApp(app) {
    currentApp = app;
    electron.mainWindow.loadURL(
        apps[app].url ||
        'file://' + path.join(appDir, app, 'index.html')
    );
}

function getCurrent() {
    return currentApp;
}

function getMain() {
    return process.env.npm_package_config_main_app;
}
