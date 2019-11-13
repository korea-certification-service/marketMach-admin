var express = require('express');
var router = express.Router();
var vtrs = require('../backend/controller/vtrs');
let BitwebResponse = require('../utils/BitwebResponse');
var sessionChecker = require('../utils/session');
var dbconfig = require('../config/dbconfig');
var request = require('request');

router.get('/lists', sessionChecker.sessionChecker, function(req, res, next) {
    res.render('vtrs/list', { title: 'Biteweb Admin - Vtrs' });
});

router.post('/search', function(req, res, next) {
    //vtrs.listVtrs(req, res);
    let bitwebResponse = new BitwebResponse();
    let url = dbconfig.APIServer + "/ma_vtrs/list/all";
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

router.put('/:vtrId', function (req, res, next) {
    vtrs.successTradeStatus(req, res);
});

router.delete('/:country/:vtrId', function (req, res, next) {
    vtrs.cancelTradeStatus(req, res);
});

module.exports = router;