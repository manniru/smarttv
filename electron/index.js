require('../apps');
require('./webapp');
var path = require('path'),
    express = require('express'),
    app = express();

app.use(require('body-parser').json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/smarttv.js', function(req, res) {
  res.sendFile(path.resolve(__dirname + '/../lib-cli.js'));
});
app.use('/assets', express.static(__dirname + '/bower_components'));
app.use(require('./serve'));

var port = process.env.npm_config_port || 8000;
console.log('app is listening on port ' + port);
var server = app.listen(port);
require('./socket')(app, server);
