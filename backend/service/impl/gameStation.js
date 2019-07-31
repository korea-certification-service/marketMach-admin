var GameCenterRecords = require('../../model/gameCenterRecords');

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

exports.list = list;