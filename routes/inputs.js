var router = require('express').Router();

router.post('/', function(req, res) {
  require('../electron').mainWindow.webContents.sendInputEvent(req.body);
  res.sendStatus(201);
});

module.exports = router;
