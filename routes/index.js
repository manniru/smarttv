var router = require('express').Router();

router.use('/channel', require('./channel'));
router.use('/storage', require('./storage'));
router.use('/apps', require('./apps'));

module.exports = router;
