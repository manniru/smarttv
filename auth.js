var jwt = require('jsonwebtoken'),
    secret = process.env.SMART_TV_SECRET || 'smart-tv-secret';

exports.isAuthenticated = isAuthenticated;
exports.createToken = createToken;
exports.verifyToken = verifyToken;

function isAuthenticated(req, res, next) {
    if (req.headers.authorization) {
        verifyToken(req.headers.authorization.split(' ')[1], function(err) {
            if (err) {
                res.send(500, err);
            } else {
                next(req, res);
            }
        });
    }
}

function createToken(cb) {
    jwt.sign({}, secret, {expiresIn: '10m'}, cb);
}

function verifyToken(token, cb) {
    jwt.verify(token, secret, cb);
}
