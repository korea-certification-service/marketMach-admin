var db = require('../../utils/db');
var bitwebOpposition = require('./impl/opposition');
var crypto = require('crypto');
var util = require('../../utils/util')

function getById(country, oppositionId) {
    return new Promise((resolve, reject) => {

        db.connectDB(country)
            .then(() => bitwebOpposition.getById(oppositionId))
            .then((result) => {
                console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

function update(country, req) {
    return new Promise((resolve , reject) => {

        let oppositionId = req.params.oppositionId;
        let data = {};
        data = req.body;
        data['replyDate'] = util.formatDate(new Date().toString())

        db.connectDB(country)
            .then(() => bitwebOpposition.updateById(oppositionId, data))
            .then((result) => {
                console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

function listOpposition (req) {
    let country = req.body.country;
    let data = {};
    if(req.body.title != undefined) {
        data = {
            $or: [{'title' : { $regex: req.body.title, $options: 'i' }}, {'content' : { $regex: req.body.title, $options: 'i' }} ]
        }
    }
    return new Promise((resolve, reject) => {
        db.connectDB(country)
            .then(() => bitwebOpposition.listOpposition(data))
            .then((result) => {
                console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

exports.update = update;
exports.listOpposition = listOpposition;
exports.getById = getById;
