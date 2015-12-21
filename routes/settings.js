var router = require('express').Router(),
    auth = require('../auth'),
    storage = require('../storage');

router.get('/', function(req, res) {
    var copy = Object.assign({}, storage.data);
    copy.password = undefined;
    return res.json(copy);
});

router.put('/defaultLocation', auth.isAuthenticated, function(req, res) {
    storage.data.settings.defaultLocation = req.body.defaultLocation;
    storage.save(function(err) {
        if (err) {
            res.status(500).json(err);
        } else {
            res.sendStatus(200);
        }
    });
});

router.put('/password', auth.isAuthenticated, function(req, res) {
    auth.checkPassword(req.body.oldPassword, function(err, valid) {
        if (err) {
            res.status(500).send(err);
        } else if (valid) {
            auth.storePassword(req.body.newPassword, function(err) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.sendStatus(200);
                }
            });
        } else {
            res.sendStatus(401);
        }
    });
});

module.exports = router;
