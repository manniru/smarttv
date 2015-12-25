require('./electron');
require('./apps');
var express = require('express'),
    server = require('http').Server(app),
    io = require('socket.io')(server),
    app = express();


app.use(require('body-parser').json());
app.use(require('./routes'));

app.get('/', function(req, res) {
    res.send('<h1>Hello world!</h1>');
});

var port = process.env.port || 8000;
console.log('app is listening on port ' + port);
app.listen(port);

exports.io = io;
