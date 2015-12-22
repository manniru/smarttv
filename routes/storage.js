var router = require('express').Router(),
    storage = require('../storage'),
    apps = require('../apps');

router.get('/', function(req, res) {
    res.json(storage.data[apps.getCurrent()] || {});
});

router.put('/', function(req, res) {
    if (!req.body) {
        res.sendStatus(422);
    }
    storage.data[apps.getCurrent()] = req.body;
    storage.save(function(err) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.sendStatus(200);
        }
    });
});
