var db = require('../../utils/db');
var bitwebUser = require('./impl/user');
var crypto = require('crypto');

function count(country, condition) {
    return new Promise((resolve, reject) => {
        db.connectDB(country)
            .then(() => bitwebUser.count(condition))
            .then((result) => {
                resolve(result)
            }).catch((err) => {
                reject(err)
        })
    })
}

function list(country, condition) {
    return new Promise((resolve, reject) => {
        db.connectDB(country)
            .then(() => bitwebUser.list(condition))
            .then((result) => {
                resolve(result)
            }).catch((err) => {
                reject(err)
        })
    })
}

function detail(country, condition) {
    return new Promise((resolve, reject) => {
        db.connectDB(country)
            .then(() => bitwebUser.detail(condition))
            .then((result) => {
                resolve(result)
            }).catch((err) => {
                reject(err)
        })
    })
}

function listUsers(req) {
    let country = req.body.country == undefined ? "KR" : req.body.country;
    let userTag = req.body.userTag;
    let email = req.body.email;
    let phone = req.body.phone;
    let perPage = req.body.perPage == undefined ? 20 : req.body.perPage;
    let pageIdx = req.body.pageIdx == undefined ? 0 : req.body.pageIdx;
    let data = {
        "perPage": perPage,
        "pageIdx": pageIdx
    }
    let body = {};
    if(userTag !== undefined) {
        body["userTag"] = userTag;
    }
    if(email !== undefined) {
        body["email"] = email;
    }
    if(phone !== undefined) {
        body["phone"] = phone;
    }
    
    return new Promise((resolve, reject) => {
        db.connectDB(country)
            .then(() => bitwebUser.listUsers(body, data))
            .then((result) => {
                console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

function updateAuthEmail(country, userId, data) {
    return new Promise((resolve, reject) => {
        db.connectDB(country)
            .then(() => bitwebUser.update(userId, data))
            .then((result) => {
                console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

function getUser(country, userId) {
    return new Promise((resolve, reject) => {
        db.connectDB(country)
            .then(() => bitwebUser.getByUserId(userId))
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

        var userId = req.params.userId;

        var data = {};
        data = req.body;

        if (data.password != undefined) {
            var password = crypto.createHash('sha256').update(data.password).digest('base64');
            data['password'] = password;
        }

        db.connectDB(country)
            .then(() => bitwebUser.update(userId, data))
            .then((result) => {
                console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

function remove(country, req) {
    return new Promise((resolve, reject) => {

        var userId = req.params.userId;
        db.connectDB(country)
            .then(() => bitwebUser.deleteUserById(userId))
            .then((result) => {
                console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

function createWithdrawUser(country, data) {
    return new Promise((resolve, reject) => {
        db.connectDB(country)
            .then(() => bitwebUser.createWithdrawUser(data))
            .then((result) => {
                console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

exports.count = count;
exports.list = list;
exports.detail = detail;
exports.listUsers = listUsers;
exports.updateAuthEmail = updateAuthEmail;
exports.getUser = getUser;
exports.update = update;
exports.remove = remove;
exports.createWithdrawUser = createWithdrawUser;
