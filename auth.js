var jwt = require('jsonwebtoken'),
    storage = require('./storage'),
    secret = process.env.SMART_TV_SECRET || 'smart-tv-secret';

exports.isAuthenticated = isAuthenticated;
exports.createToken = createToken;
exports.verifyToken = verifyToken;
exports.checkPassword = checkPassword;
exports.storePassword = storePassword;

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

function checkPassword(password, cb) {
    bcrypt.compare(password, storage.data.password, cb);
}

function storePassword(password, cb) {
    bcrypt.genSalt(function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
            storage.data.password = hash;
            storage.save(cb);
        });
    });
}
