var router = require('express').Router(),
    bcrypt = require('bcrypt'),
    auth = require('../auth'),
    storage = require('../storage').data,
    secret = process.env.SMART_TV_SECRET || 'smart-tv-secret';

router.post('/login', function(req, res) {
    auth.checkPassword(req.body.password, function(err, valid) {
        if (valid) {
            auth.createToken(function(token) {
                res.json({
                    token: token
                });
            });
        } else {
            res.sendStatus(401);
        }
    });
});

module.exports = router;
