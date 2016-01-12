var express = require('express');
var router = express.Router();
var apps = require('../apps');
var webapp = require('./webapp');

// Serve apps
router.get('/', function(req, res) {
    if (apps.getMain() !== apps.getCurrent()) {
      script = 'history.replaceState({}, \'' + apps.getMain() +
        '\',  \'/' + apps.getMain() + '/\');' +
        'setTimeout(function() {window.location.href = \'/' +
        apps.getCurrent() + '\';}, 0);';
    } else {
      script = 'window.location.replace(\'/' + apps.getMain() + '\');';
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
  // Ignore public files
  if (req.path.match(/^\/[^\/]+\/public/)) {
    return next();
  }

  var match = req.path.match(/^\/([^\/]+)/);
  if (match && match[1]) {
    var name = match[1];
    if (apps.get(name)) {
      if (apps.getCurrent() !== name) {
        webapp.showApp(name);
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
  if (!req.path.match(/^\/[^\/]+\/(public|client)/)) {
    res.redirect('/' + apps.getCurrent() + '/client/');
  } else {
    next();
  }
});
var home = process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
var appDir = home + '/.smarttv/apps';
router.use(express.static(appDir));

module.exports = router;
