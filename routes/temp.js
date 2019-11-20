/**
 * 현재 사용 안함
 * 작성자 : Chef Kim
 * 작성일 : 2019-11-20
 */
var express = require('express');
var router = express.Router();
var sessionChecker = require('../utils/session');

router.get('/', sessionChecker.sessionChecker, function(req, res, next) {
    res.render('temp/test', { title: 'Biteweb Admin - Coin Deposits' });
});

module.exports = router;