var router = require('express').Router();

router.use('/settings', require('./settings'));
router.use('/location', require('./location'));
router.use('/auth', require('./auth'));

module.exports = router;
