module.exports = function(server) {
    var io = require('socket.io')(server);

    io.on('connection', function() {
        io.emit('connection');
    });
};
