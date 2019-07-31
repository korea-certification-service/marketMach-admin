var BitwebResponse = require('../../utils/BitwebResponse');
var serviceGameStation = require('../service/gameStation');

function list(country,condition) {
    var bitwebResponse = new BitwebResponse();
    
    serviceGameStation.list(country, condition)
        .then(result => {
            bitwebResponse.code = 200;
            bitwebResponse.data = result;
            res.status(200).send(bitwebResponse.create());
        }).catch((err) => {
        console.error('err=>', err)
        bitwebResponse.code = 500;
        bitwebResponse.message = err;
        res.status(500).send(bitwebResponse.create())
    })
}

exports.list = list;