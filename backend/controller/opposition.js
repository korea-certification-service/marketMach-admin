var BitwebResponse = require('../../utils/BitwebResponse');
var serviceOpposition = require('../service/opposition');

function listOpposition(req, res) {
    var bitwebResponse = new BitwebResponse();

    serviceOpposition.listOpposition(req)
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

function getOpposition(req, res) {
    let country = req.params.country;
    let oppositionId = req.params.oppositionId;
    var bitwebResponse = new BitwebResponse();

    if (oppositionId != null) {
        serviceOpposition.getById(country, oppositionId)
            .then(result => {
                bitwebResponse.code = 200;
                bitwebResponse.data = result;
                res.status(200).send(bitwebResponse.create())
            }).catch((err) => {
            console.error('err=>', err)
            bitwebResponse.code = 500;
            bitwebResponse.message = err;
            res.status(500).send(bitwebResponse.create())
        })
    }
}

function modifyOpposition(req, res) {
    let country = req.body.country;
    var bitwebResponse = new BitwebResponse();

    serviceOpposition.update(country, req)
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

exports.listOpposition = listOpposition;
exports.getOpposition = getOpposition;
exports.modifyOpposition = modifyOpposition;