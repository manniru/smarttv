var router = require('express').Router();

router.use('/channel', require('./channel'));
router.use('/auth', require('./auth'));
router.use('/settings', require('./settings'));
router.use('/storage', require('./storage'));

module.exports = router;
