const app = require('express')();
const apps = require('./apps');

app.get('/app', function(req, res) {
  if (apps.current) {
    res.redirect(apps.current.tv);
  } else {
    res.sendStatus(500);
  }
});

app.listen(8000);
