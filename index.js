require('./electron');
var express = require('express'),
    app = express();

app.use(require('body-parser').json());
app.use(require('./routes'));

app.get('/', function(req, res) {
    res.send('<h1>Hello world!</h1>');
});

var port = process.env.port || 8000;
console.log('app is listening on port ' + port);
app.listen(port);
