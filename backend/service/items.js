let db = require('../../utils/db');
let serviceItems = require('./impl/items');

function getItemsByIds(ids) {
    return new Promise((resolve, reject) => {
        db.connectDB()
            .then(() => serviceItems.getItemsByIds(ids))
            .then((result) => {
                console.log('result=>', result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

function count(condition) {
    return new Promise((resolve, reject) => {
        db.connectDB()
            .then(() => serviceItems.count(condition))
            .then((result) => {
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

function list(condition) {
    return new Promise((resolve, reject) => {
        db.connectDB()
            .then(() => serviceItems.list(condition))
            .then((result) => {
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

function replyList(condition) {
    return new Promise((resolve, reject) => {
        db.connectDB()
            .then(() => serviceItems.replyList(condition))
            .then((result) => {
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}




exports.getItemsByIds = getItemsByIds;
exports.count = count;
exports.list = list;
exports.replyList = replyList;