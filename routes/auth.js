var router = require('express').Router(),
    bcrypt = require('bcrypt'),
    auth = require('../auth'),
    storage = require('../storage').data,
    secret = process.env.SMART_TV_SECRET || 'smart-tv-secret';

router.post('/login', function(req, res) {
    bcrypt.compare(req.body.password, storage.password, function(err, valid) {
        if (valid) {
            auth.createToken(function(err, token) {
                if (err) {
                    return res.send(500, err);
                }
                return res.json({
                    token: token
                });
            });
        }
        return res.sendStatus(401);
    });
});

module.exports = router;
