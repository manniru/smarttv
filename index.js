require('./electron');
var path = require('path'),
    express = require('express'),
    server = require('http').Server(app),
    apps = require('./apps'),
    app = express();

require('./socket')(server);

app.use(require('body-parser').json());
app.use(express.static(path.join(
    __dirname + '/node_modules/' + apps.getCurrent() + '/client'
)));
app.use('/api', require('./routes'));

var port = process.env.npm_config_port || 8000;
console.log('app is listening on port ' + port);
app.listen(port);
