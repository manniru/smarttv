var apps = require('../../apps');
var router = require('express').Router();

router.get('/', function(req, res) {
    res.json(Object.keys(apps.list));
});

module.exports = router;
