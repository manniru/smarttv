var router = require('express').Router();

router.post('/', function(req, res) {
  require('../webapp').mainWindow.webContents.sendInputEvent(req.body);
  res.sendStatus(201);
});

module.exports = router;
