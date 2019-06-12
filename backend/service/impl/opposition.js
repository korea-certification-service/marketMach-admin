var Opposition = require('../../model/oppositions');

function getById (oppositionId) {
    return new Promise((resolve, reject) => {
        Opposition.findOne(
            {"_id": oppositionId},
            function(err, user) {
                if (err) {
                    console.error(err)
                    reject(err)
                }
                console.log('getById done: ' + user)
                resolve(user)
            }
        )
    })
}

function updateById(oppositionId, body) {
    return new Promise((resolve, reject) => {
        Opposition.findOneAndUpdate(
            {"_id": oppositionId
            },
            {$set: body
            },
            {upsert: false, new: true},
            function(err, data) {
                if (err) {
                    console.error(err)
                    reject(err)
                }
                resolve(data)
            })
    })
}

function listOpposition (data) {
    return new Promise((resolve, reject) => {
        Opposition.find(data)
            .sort({regDate: 'desc'})
            .exec(function (err, item) {
                if (err) {
                    console.error(err)
                    reject(err)
                }
                console.log('listOpposition done: ' + item)
                resolve(item)
            })
    })
}

exports.getById = getById;
exports.updateById = updateById;
exports.listOpposition = listOpposition;
