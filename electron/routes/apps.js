var apps = require('../../apps');
var router = require('express').Router();

router.get('/', function(req, res) {
    res.json(apps.list);
});

module.exports = router;
