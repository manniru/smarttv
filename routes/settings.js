var router = require('express').Router(),
    isAuthenticated = require('../auth').isAuthenticated,
    storage = require('../storage');

router.get('/', function(req, res) {
    return res.json(storage.data.settings);
});

router.put('/defaultLocation', isAuthenticated, function(req, res) {
    storage.data.settings.defaultLocation = req.body.defaultLocation;
    storage.save(function(err) {
        if (err) {
            res.status(500).json(err);
        } else {
            res.sendStatus(200);
        }
    });
});

module.exports = router;
