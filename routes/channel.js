var router = require('express').Router(),
    storage = require('../storage');

router.get('/', function(req, res) {
    res.json({
        app: storage.data.currentApp
    });
});

router.post('/', function(req, res) {
    storage.data.currentApp = req.body.currentApp;
    res.sendStatus(200);
});

module.exports = router;
