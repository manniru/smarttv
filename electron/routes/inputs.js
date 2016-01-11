var router = require('express').Router();

router.post('/', function(req, res) {
  require('../webapp').sendInput(req.body);
  res.sendStatus(201);
});

module.exports = router;
