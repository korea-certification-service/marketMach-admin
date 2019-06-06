var express = require('express');
var router = express.Router();
var coins = require('../backend/controller/coins');
var sessionChecker = require('../utils/session');

router.get('/deposit/lists', sessionChecker.sessionChecker, function(req, res, next) {
    res.render('coins/deposits', { title: 'Biteweb Admin - Coin Deposits' });
});

router.post('/deposit/search', function(req, res, next) {
    coins.listCoinDepositHistory(req, res);
});

router.put('/deposit/:coinType/:historyId', function(req, res, next) {
    if(req.params.coinType == "btc") {
        coins.updateBtcCoinDepositHistory(req, res);
    } else if(req.params.coinType == "ether") {
        coins.updateEtherCoinDepositHistory(req, res);
    } else if(req.params.coinType == "mach") {
        coins.updateMachCoinDepositHistory(req, res);
    }
});

router.get('/withdraw/lists', sessionChecker.sessionChecker, function(req, res, next) {
    res.render('coins/withdraws', { title: 'Biteweb Admin - Coin Withdraws' });
});

router.post('/withdraw/search', function(req, res, next) {
    coins.listCoinWithdrawHistory(req, res);
});

router.put('/withdraw/:coinType/:historyId', function(req, res, next) {
    coins.updateWithdrawHistory(req, res);
});

module.exports = router;