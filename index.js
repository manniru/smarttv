require('./electron');
var path = require('path'),
    express = require('express'),
    server = require('http').Server(app),
    io = require('socket.io')(server),
    apps = require('./apps'),
    app = express();


app.use(require('body-parser').json());
app.use(express.static(path.join(
    __dirname + '/node_modules/' + apps.getCurrent() + '/client'
)));
app.use('/api', require('./routes'));


var port = process.env.npm_config_port;
console.log('app is listening on port ' + port);
app.listen(port);

exports.io = io;
