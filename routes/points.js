var express = require('express');
var router = express.Router();
var points = require('../backend/controller/points');
var sessionChecker = require('../utils/session');

router.get('/lists', sessionChecker.sessionChecker, function(req, res, next) {
    res.render('points/trade', { title: 'Biteweb Admin - PointTrades' });
});

router.post('/search', function(req, res, next) {
    points.listPointTrade(req, res);
});

router.get('/deposits/lists', sessionChecker.sessionChecker, function(req, res, next) {
    res.render('points/deposit', { title: 'Biteweb Admin - Point Historys' });
});

router.get('/withdraws/lists', sessionChecker.sessionChecker, function(req, res, next) {
    res.render('points/withdraw', { title: 'Biteweb Admin - Point Historys' });
});

router.post('/history/search', function(req, res, next) {
    points.listPointHistorys(req, res);
});

router.put('/:pointId', function(req, res, next) {
    points.updateWithdrawStatus(req, res);
});

router.put('/pointTrade/:tradePointId', function (req, res, next) {
    points.successTradeStatus(req, res);
});

router.delete('/pointTrade/:tradePointId', function (req, res, next) {
    points.cancelTradeStatus(req, res);
});

module.exports = router;