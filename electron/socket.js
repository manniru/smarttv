module.exports = function(app, server) {
  var io = require('socket.io')(server);
  var webapp = require('./webapp');
  var clients = {};

  try {
    var ipcMain = require('electron').ipcMain;
    ipcMain.on('private', function(event, to, message) {
      if (clients[to]) {
        clients[to].emit('private', message);
        clients[to].emit('message', message);
      }
    });

    ipcMain.on('public', function(event, message) {
      io.emit('public', message);
      io.emit('message', message);
    });
  } catch(e) {
    console.log('Messages to webapp disabled');
  }

  io.on('connection', function(socket) {
    webapp.send('connect', socket.id);
    clients[socket.id] = socket;

    socket.on('message', function(message) {
      webapp.send('message', socket.id, message);
    });

    socket.on('disconnect', function() {
      webapp.send('disconnect', socket.id);
    });
  });
};
