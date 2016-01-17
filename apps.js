var fs = require('fs'),
  path = require('path'),
  apps = {};

var currentApp, mainApp;

// Loop through node_modules searching for apps with smarttv.json
var home = process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
var appsDir = home + '/.smarttv/apps';

try{
  console.log('Loading apps...');
  var modules = fs.readdirSync(appsDir);
} catch(e) {
  console.log('.smarttv/apps/ dir not found, creating...');
  try { fs.mkdirSync(home + '/.smarttv'); } catch(e) {}
  try { fs.mkdirSync(appsDir); } catch(e) {}
  var modules = fs.readdirSync(appsDir);
}

modules.forEach(function(mod) {
  var ls;
  try {
    ls = fs.readdirSync(path.join(appsDir, mod));
  } catch(e) {}
  if (ls && ls.indexOf('smarttv.json') !== -1) {
    var app = require(path.join(appsDir, mod, 'smarttv.json'));
    apps[mod] = app;
    app.name = mod;
    if (app.launcher) {
      if (mainApp) {
        throw new Error(
          'More than one launcher apps found. Remove one to start.'
        );
      } else {
        mainApp = app.name;
      }
    }
  }
});

if (!mainApp) {
  throw new Error('No launcher app found. You need a launcher to show!');
}

currentApp = mainApp;

var list = [];
for (var app in apps) {
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
  return mainApp;
}

function get(app) {
  return apps[app];
}
