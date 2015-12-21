var router = require('express').Router();

router.use('/settings', require('./settings'));
router.use('/location', require('./location'));

module.exports = router;
