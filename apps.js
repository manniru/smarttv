const electron = require('./electron');
const settings = require('./settings');
const _ = require('lodash');

electron.onLoad(function() {
  openApp(get(settings.get('home')));
});

exports.list = [
  {
    name: 'launcher',
    tv: 'https://www.github.com',
    device: 'http://electron.atom.io/'
  }
];

function get(name) {
  return _.find(exports.list, {name});
}

function openApp(app) {
  electron.mainWindow.loadURL(app.tv);
  exports.current = app;
}
