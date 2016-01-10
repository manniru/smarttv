module.exports = function(app, server) {
  var io = require('socket.io')(server);
  var electron = require('./webapp');
  var clients = {};

  try {
    var ipcMain = require('electron').ipcMain;
    ipcMain.on('private', function(event, to, message) {
      if (clients[to]) {
        clients[to].emit('private', message);
      }
    });

    ipcMain.on('public', function(event, message) {
      io.emit('public', message);
    });
  } catch(e) {
    console.log('Messages to webapp disabled');
  }

  io.on('connection', function(socket) {
    electron.mainWindow.webContents.send('connect', socket.id);
    clients[socket.id] = socket;

    socket.on('private', function(message) {
      electron.mainWindow.webContents.send('private', message);
    });

    socket.on('public', function(message) {
      electron.mainWindow.webContents.send('public', message);
      io.emit('public', message);
    });

    socket.on('disconnect', function() {
      electron.mainWindow.webContents.send('disconnect', socket.id);
    });
  });
};
