var router = require('express').Router(),
    apps = require('../apps');

router.get('/', function(req, res) {
    res.json({
        app: apps.getCurrent()
    });
});

router.put('/', function(req, res) {
    if (apps.list[req.body.app]) {
        apps.show(req.body.app);
        res.sendStatus(200);
    } else {
        res.sendStatus(404);
    }
});

module.exports = router;
