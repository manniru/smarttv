var apps = require('./apps');
var electron = require('electron');
var ipcRenderer = electron.ipcRenderer;

exports.apps = {
  list: apps.list,
  dir: apps.dir
};
exports.send = send;
exports.on = on;

function on(channel, fn) {
  ipcRenderer.on(channel, function() {
    fn.apply(this, Array.prototype.slice.call(arguments, 1));
  });
}

function send(dest, mex) {
  if (typeof mex === 'undefined') {
    mex = dest;
    ipcRenderer.send('public', mex);
  } else {
    ipcRenderer.send('private', dest, mex);
  }
}
