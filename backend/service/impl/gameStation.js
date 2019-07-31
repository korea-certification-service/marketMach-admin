var GameCenterRecords = require('../../model/gameCenterRecords');
var GameCenterExchangeHistorys = require('../../model/gameCenterExchangeHistory');

function list(data) {
    return new Promise((resolve, reject) => {
        GameCenterRecords.find(data)
            .sort({regDate: 'desc'})
            .exec(function (err, item) {
                if (err) {
                    console.error(err)
                    reject(err)
                }
                resolve(item)
            })
    })
}

function exchangeList(data) {
    return new Promise((resolve, reject) => {
        GameCenterExchangeHistorys.find(data)
            .sort({regDate: 'desc'})
            .exec(function (err, item) {
                if (err) {
                    console.error(err)
                    reject(err)
                }
                resolve(item)
            })
    })
}

exports.list = list;
exports.exchangeList = exchangeList;