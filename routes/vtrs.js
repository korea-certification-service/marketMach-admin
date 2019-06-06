var express = require('express');
var router = express.Router();
var vtrs = require('../backend/controller/vtrs');
var sessionChecker = require('../utils/session');

router.get('/lists', sessionChecker.sessionChecker, function(req, res, next) {
    res.render('vtrs/list', { title: 'Biteweb Admin - Vtrs' });
});

router.post('/search', function(req, res, next) {
    vtrs.listVtrs(req, res);
});

router.put('/:vtrId', function (req, res, next) {
    vtrs.successTradeStatus(req, res);
});

router.delete('/:country/:vtrId', function (req, res, next) {
    vtrs.cancelTradeStatus(req, res);
});

module.exports = router;