var router = require('express').Router();

router.use('/channel', require('./channel'));
router.use('/storage', require('./storage'));

module.exports = router;
