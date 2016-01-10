var router = require('express').Router();

router.use('/apps', require('./apps'));
router.use('/inputs', require('./inputs'));

module.exports = router;
