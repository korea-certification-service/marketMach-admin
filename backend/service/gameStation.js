var db = require('../../utils/db');
var bitwebGameStation = require('./impl/gameStation');
var util = require('../../utils/util');

function list (country, condition) {
    return new Promise((resolve, reject) => {
        db.connectDB(country)
            .then(() => bitwebGameStation.list(condition))
            .then((result) => {
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

function exchangeList (country, condition) {
    return new Promise((resolve, reject) => {
        db.connectDB(country)
            .then(() => bitwebGameStation.exchangeList(condition))
            .then((result) => {
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

exports.list = list;
exports.exchangeList = exchangeList;