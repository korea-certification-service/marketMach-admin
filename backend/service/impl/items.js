let Items = require('../../model/items');
let ReplyItems = require('../../model/replyItems');

function getItems(condition) {
    return new Promise((resolve, reject) => {
        Items.find(condition)
            .sort({regDate:'desc'})
            .exec(function (err, item) {
                    if (err) {
                        console.error(err)
                        reject(err)
                    }
                    console.log('getItemsByIds done: ' + item)
                    resolve(item)
                }
            )
    })
}

function getItemsByIds(ids) {
    return new Promise((resolve, reject) => {
        Items.find(
            {
                "_id": {$in: ids},
            })
            .sort({regDate:'desc'})
            .exec(function (err, item) {
                    if (err) {
                        console.error(err)
                        reject(err)
                    }
                    console.log('getItemsByIds done: ' + item)
                    resolve(item)
                }
            )
    })
}

function updateItemStatus(id, body) {
    return new Promise((resolve, reject) => {
        Items.findOneAndUpdate(
            {"_id": id},
            {$set: body},
            function(err, item) {
                if (err) {
                    console.error(err)
                    reject(err)
                }
                console.log('updateItemStatus done: ' + item)
                resolve(item)
            }
        )
    })
}

function count(condition) {
    return new Promise((resolve, reject) => {
        Items.count(
            condition,
            function(err, item) {
                if (err) {
                    reject(err)
                }
                resolve(item)
            }
        )
    })
}

function list(condition) {
    return new Promise((resolve, reject) => {
        Items.find(
            condition,
            function(err, item) {
                if (err) {
                    reject(err)
                }
                resolve(item)
            }
        )
    })
}

function replyList(condition) {
    return new Promise((resolve, reject) => {
        ReplyItems.find(
            condition,
            function(err, item) {
                if (err) {
                    reject(err)
                }
                resolve(item)
            }
        )
    })
}

exports.getItems = getItems;
exports.getItemsByIds = getItemsByIds;
exports.updateItemStatus = updateItemStatus;
exports.count = count;
exports.list = list;
exports.replyList = replyList;
