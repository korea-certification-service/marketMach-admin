/**
 * 포인트 관련 기능
 * 작성자 : Chef Kim
 * 작성일 : 2019-11-20
 */
var express = require('express');
var router = express.Router();
var points = require('../backend/controller/points');
var sessionChecker = require('../utils/session');
let BitwebResponse = require('../utils/BitwebResponse');
var dbconfig = require('../config/dbconfig');
var request = require('request');

//포인트 거래 내역 조회 page 호출
router.get('/lists', sessionChecker.sessionChecker, function(req, res, next) {
    res.render('points/trade', { title: 'Biteweb Admin - PointTrades' });
});

//포인트 거래 내역 조회
router.post('/search', function(req, res, next) {
    //points.listPointTrade(req, res);
    let bitwebResponse = new BitwebResponse();
    let url = dbconfig.APIServer + "/ma_points/list/all";
    let header = {
        'loginToken': req.cookies.loginToken,
        'token': dbconfig.APIToken
    };
    let body = req.body;
    let reqs = {uri: url, 
        method:'POST',
        headers: header,
        body:body,
        json: true
    }

    //API 서버로 내부 call요청한다.
    request(reqs, function (error, response, body) {  
        console.log(error, response, body);
        if (!error && response.statusCode == 200) {
            let result = body.data;
            if(typeof(body) == "string") {
                result = JSON.parse(body).data;
            }
            
            bitwebResponse.code = 200;
            bitwebResponse.data = result;
            res.status(200).send(bitwebResponse.create())
        } else {
            console.error('err=>', error)
            bitwebResponse.code = 500;
            bitwebResponse.message = error;
            res.status(500).send(bitwebResponse.create())
        }
    });
});

//포인트 입금 내역 조회 page 호출
router.get('/deposits/lists', sessionChecker.sessionChecker, function(req, res, next) {
    res.render('points/deposit', { title: 'Biteweb Admin - Point Historys' });
});

//포인트 출금 내역 조회 page 호출
router.get('/withdraws/lists', sessionChecker.sessionChecker, function(req, res, next) {
    res.render('points/withdraw', { title: 'Biteweb Admin - Point Historys' });
});

//포인트 입출금 내역 조회
router.post('/history/search', function(req, res, next) {
    points.listPointHistorys(req, res);
});

//포인트 입출금 결과 수동 처리
router.put('/:pointId', function(req, res, next) {
    points.updateWithdrawStatus(req, res);
});

//포인트 거래 강제 거래 완료 처리
router.put('/pointTrade/:tradePointId', function (req, res, next) {
    points.successTradeStatus(req, res);
});

//포인트 거래 강제 거래 취소 처리
router.delete('/pointTrade/:tradePointId', function (req, res, next) {
    points.cancelTradeStatus(req, res);
});

module.exports = router;