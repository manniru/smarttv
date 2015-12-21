var router = require('express').Router(),
    getWindow = require('../electron');

router.get('/', function(req, res) {
    res.json({
        location: getWindow().getURL()
    });
});

router.put('/', function(req, res) {
    getWindow().loadURL(req.body.location);
    res.sendStatus(200);
});

module.exports = router;
