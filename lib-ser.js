var electron = require('electron');
var ipcRenderer = electron.ipcRenderer;
var apps = require('./apps');

exports.apps = {
  list: apps.list,
  dir: apps.dir
};

exports.send = send;
exports.on = function(channel, fn) {
  ipcRenderer.on(channel, function() {
    fn.apply(this, arguments.slice(1));
  });
  ipcRenderer.on.apply(ipcRenderer, arguments);
};

function send(dest, mex) {
  if (typeof mex === 'undefined') {
    mex = dest;
    ipcRenderer.send('public', mex);
  } else {
    ipcRenderer.send('private', dest, mex);
  }
}
