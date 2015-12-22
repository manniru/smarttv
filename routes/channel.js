var router = require('express').Router(),
    apps = require('../apps');

router.get('/', function(req, res) {
    res.json({
        app: apps.getCurrent()
    });
});

router.post('/', function(req, res) {
    apps.show(req.body.app);
    res.sendStatus(200);
});

module.exports = router;
