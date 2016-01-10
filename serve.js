var express = require('express');
var router = express.Router();
var apps = require('./apps');

// Serve apps
router.get('/', function(req, res) {
    if (apps.getMain() !== apps.getCurrent()) {
      script = 'history.replaceState({}, \'' + apps.getMain() +
        '\',  \'/smarttv-' + apps.getMain() + '/\');' +
        'setTimeout(function() {window.location.href = \'/smarttv-' +
        apps.getCurrent() + '\';}, 0);';
    } else {
      script = 'window.location.replace(\'/smarttv-' +
        apps.getMain() + '\');';
    }
    res.status(200).send('<script>' + script + '</script>');
});
// Force refresh on back button
router.use(function(req, res, next) {
  res.setHeader('Cache-Control', 'private, no-store, max-age=0, no-cache, must-revalidate, post-check=0, pre-check=0');
  res.setHeader('Pragma', 'no-cache');
  next();
});
// Show app
router.use(function(req, res, next) {
    var match = req.path.match(/^\/smarttv-([^\/]+)/);
    if (match && match[1]) {
      var name = match[1];
      if (apps.list[name]) {
        if (apps.getCurrent() !== name) {
          apps.show(name);
        }
        next();
      } else {
        res.sendStatus(404);
      }
    } else {
      res.sendStatus(404);
    }
});
// Redirect to /client
router.use(function(req, res, next) {
  if (!req.path.startsWith('/smarttv-' + apps.getCurrent() + '/client/')) {
    res.redirect('/smarttv-' + apps.getCurrent() + '/client/');
  } else {
    next();
  }
});
router.use(express.static(__dirname + '/node_modules'));

module.exports = router;
