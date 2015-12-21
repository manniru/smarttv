var jwt = require('jsonwebtoken'),
    secret = process.env.SMART_TV_SECRET || 'smart-tv-secret';

exports.isAuthenticated = isAuthenticated;
exports.createToken = createToken;
exports.verifyToken = verifyToken;

function isAuthenticated(req, res, next) {
    if (req.headers.authorization) {
        verifyToken(req.headers.authorization.split(' ')[1], function(err) {
            if (err) {
                res.status(500).send(err);
            } else {
                next();
            }
        });
    }
    else res.sendStatus(401);
}

function createToken(cb) {
    jwt.sign({}, secret, {expiresIn: '10m'}, cb);
}

function verifyToken(token, cb) {
    jwt.verify(token, secret, cb);
}
