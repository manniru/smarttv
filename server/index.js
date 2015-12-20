var express = require('express'),
    app = express();

app.get('/', function(req, res) {
    res.send('<h1>Hello world!</h1>');
});

app.listen(process.env.port || 8000);
