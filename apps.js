var fs = require('fs'),
  path = require('path'),
  apps = {};

var currentApp = process.env.npm_package_config_main_app;

// Loop through node_modules searching for apps with smarttv.json
var home = process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
var appsDir = home + '/.smarttv/apps';

try{
  console.log('Loading apps...');
  var modules = fs.readdirSync(appsDir);
} catch(e) {
  console.log('.smarttv/apps/ dir not found, creating...');
  try {
    fs.mkdirSync(home + '/.smarttv');
  } catch(e) {}
  try {
    fs.mkdirSync(appsDir);
  } catch(e) {}
  var modules = fs.readdirSync(appsDir);
}

modules.forEach(function(mod) {
  try {
    var ls = fs.readdirSync(path.join(appsDir, mod));
    if (ls.indexOf('smarttv.json') !== -1) {
      var app = require(path.join(appsDir, mod, 'smarttv.json'));
      apps[mod] = app;
    }
  } catch(e) {}
});

var list = [];
for (var app in apps) {
  apps[app].name = app;
  list.push(apps[app]);
}

exports.list = list;
exports.getCurrent = getCurrent;
exports.setCurrent = setCurrent;
exports.get = get;
exports.getMain = getMain;
exports.dir = appsDir;

function getCurrent() {
  return currentApp;
}

function setCurrent(app) {
  currentApp = app;
}

function getMain() {
  return process.env.npm_package_config_main_app;
}

function get(app) {
  return apps[app];
}
