/**
 * 암호화폐 관련 기능
 * 작성자 : Chef Kim
 * 작성일 : 2019-11-20
 */
var express = require('express');
var router = express.Router();
var coins = require('../backend/controller/coins');
var sessionChecker = require('../utils/session');

//입금 내역 조회 page 호출
router.get('/deposit/lists', sessionChecker.sessionChecker, function(req, res, next) {
    res.render('coins/deposits', { title: 'Biteweb Admin - Coin Deposits' });
});

//입금 내역 조회
router.post('/deposit/search', function(req, res, next) {
    coins.listCoinDepositHistory(req, res);
});

//암호화폐 수동 입금 처리(현재 사용 안함)
router.put('/deposit/:coinType/:historyId', function(req, res, next) {
    if(req.params.coinType == "btc") {
        coins.updateBtcCoinDepositHistory(req, res);
    } else if(req.params.coinType == "ether") {
        coins.updateEtherCoinDepositHistory(req, res);
    } else if(req.params.coinType == "mach") {
        coins.updateMachCoinDepositHistory(req, res);
    }
});

//출금 내역 조회 page 호출
router.get('/withdraw/lists', sessionChecker.sessionChecker, function(req, res, next) {
    res.render('coins/withdraws', { title: 'Biteweb Admin - Coin Withdraws' });
});

//출금 내역 조회
router.post('/withdraw/search', function(req, res, next) {
    coins.listCoinWithdrawHistory(req, res);
});

//암호화폐 수동 출금 처리(현재 사용 안함)
router.put('/withdraw/:coinType/:historyId', function(req, res, next) {
    coins.updateWithdrawHistory(req, res);
});

module.exports = router;