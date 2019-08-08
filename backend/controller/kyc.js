var BitwebResponse = require('../../utils/BitwebResponse');
var request = require('request');
var dbconfig = require('../../config/dbconfig');

function list(req, res) {
    var bitwebResponse = new BitwebResponse();
    let body = {        
        "option": {
            "perPage" : req.body.perPage == undefined ? 20 : req.body.perPage,
            "pageIdx" : req.body.perIdx == undefined ? 0 : req.body.perIdx
        }
    };
    delete req.body['perPage'];
    delete req.body['perIdx'];
    body["param"] = req.body;

    let url = dbconfig.APIServer + "/ma_kyc/list";
    let header = {
        'token': dbconfig.APIToken
    };
    let reqs = {uri: url, 
        method:'POST',
        headers: header,
        body:body,
        json:true
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
}

function detail(req, res) {
    var bitwebResponse = new BitwebResponse();
    let userId = req.params.userId;
    let url = dbconfig.APIServer + "/ma_kyc/" + userId;
    let header = {
        'token': dbconfig.APIToken
    };
    let reqs = {uri: url, 
        method:'GET',
        headers: header
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
}

function modify(req, res) {
    var bitwebResponse = new BitwebResponse();
    let userId = req.params.userId;
    let body = req.body;

    let url = dbconfig.APIServer + "/ma_kyc/" + userId;
    let header = {
        'token': dbconfig.APIToken
    };
    let reqs = {uri: url, 
        method:'PUT',
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
}

exports.list = list;
exports.detail = detail;
exports.modify = modify;