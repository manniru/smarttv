var router = require('express').Router();

router.use('/settings', require('./settings'));
router.use('/auth', require('./auth'));

module.exports = router;
