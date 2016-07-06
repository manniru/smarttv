const electron = require('./electron');

electron.onLoad(function() {
  electron.mainWindow.loadURL('http://www.github.com');
});

exports.list = [
  {
    name: 'launcher',
  }
];
