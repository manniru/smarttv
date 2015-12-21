var router = require('express').Router(),
    storage = require('../storage');

router.get('/', function(req, res) {
    return res.json(storage.data.settings);
});

module.exports = router;
