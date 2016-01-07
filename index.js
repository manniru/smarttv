require('./electron');
var path = require('path'),
    express = require('express'),
    server = require('http').Server(app),
    apps = require('./apps'),
    app = express();

require('./socket')(server);

app.use(require('body-parser').json());

app.use('/api', require('./routes'));

// Serve apps
app.get('/', function(req, res) {
    res.redirect('/smarttv-' + apps.getCurrent() + '/client/');
});
app.use(function(req, res, next) {
    // Check requeste app is the current one
    if (!req.path.startsWith('/smarttv-' + apps.getCurrent() + '/client/')) {
        res.redirect('/');
    } else {
        next();
    }
});
app.use(express.static(__dirname + '/node_modules'));

var port = process.env.npm_config_port || 8000;
console.log('app is listening on port ' + port);
app.listen(port);
