var express = require('express');
var router = express.Router();
var sessionChecker = require('../utils/session');

router.get('/', sessionChecker.sessionChecker, function(req, res, next) {
    res.render('temp/test', { title: 'Biteweb Admin - Coin Deposits' });
});

module.exports = router;