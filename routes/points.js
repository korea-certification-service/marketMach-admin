var express = require('express');
var router = express.Router();
var points = require('../backend/controller/points');
var sessionChecker = require('../utils/session');
let BitwebResponse = require('../utils/BitwebResponse');
var dbconfig = require('../config/dbconfig');
var request = require('request');

router.get('/lists', sessionChecker.sessionChecker, function(req, res, next) {
    res.render('points/trade', { title: 'Biteweb Admin - PointTrades' });
});

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

    //채팅 서버에서 API 서버로 내부 call요청한다.
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