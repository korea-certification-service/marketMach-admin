var express = require('express');
var router = express.Router();
var serviceUsers = require('../backend/service/user');
var serviceCoins = require('../backend/service/coins');
var servicePoints = require('../backend/service/points');
var serviceVtrs = require('../backend/service/vtrs');
var serviceGameStation = require('../backend/service/gameStation');
var util = require('../utils/util');
var dbconfig = require('../config/dbconfig');
var BitwebResponse = require('../utils/BitwebResponse')

router.post('/user/list', function (req, res, next) {
    let country = dbconfig.country;
    let condition = {};
    if(req.body.length > 0) {
        condition = req.body;
    }
    let bitwebResponse = new BitwebResponse();
    
    serviceUsers.count(country, condition)
    .then(count => {
        serviceUsers.list(country, condition)
        .then(users => {
            serviceCoins.list(country,condition) 
            .then(coins => {
                servicePoints.list(country, condition)
                .then(points => {
                    for(var i in users) {
                        for(var j in coins) {
                            if(users[i]._doc.coinId.toString() == coins[j]._doc._id.toString()) {
                                users[i]._doc['coinInfo'] = coins[j];
                            }
                        }

                        for(var k in points) {
                            if(users[i]._doc.pointId.toString() == points[k]._doc._id.toString()) {
                                users[i]._doc['pointInfo'] = points[k];
                            }
                        }
                    }
                    let result = {
                        "count": count,
                        "list": users
                    }
                    bitwebResponse.code = 200;
                    bitwebResponse.data = result;
                    res.status(200).send(bitwebResponse.create())
                }).catch((err) => {
                    console.error('err=>', err)
                    bitwebResponse.code = 500;
                    bitwebResponse.message = err;
                    res.status(500).send(bitwebResponse.create())
                })
            }).catch((err) => {
                console.error('err=>', err)
                bitwebResponse.code = 500;
                bitwebResponse.message = err;
                res.status(500).send(bitwebResponse.create())
            })
        }).catch((err) => {
            console.error('err=>', err)
            bitwebResponse.code = 500;
            bitwebResponse.message = err;
            res.status(500).send(bitwebResponse.create())
        })
    }).catch((err) => {
        console.error('err=>', err)
        bitwebResponse.code = 500;
        bitwebResponse.message = err;
        res.status(500).send(bitwebResponse.create())
    })
});

router.get('/user/detail/:userTag', function (req, res, next) {
    let country = dbconfig.country;
    let userTag = req.params.userTag;
    let bitwebResponse = new BitwebResponse();
    
    serviceUsers.detail(country, {"userTag": userTag})
    .then(user => {
        serviceCoins.detail(country,{"_id": user._doc.coinId}) 
        .then(coin => {
            servicePoints.detail(country, {"_id": user._doc.pointId})
            .then(point => {
                serviceCoins.detailHistory(country,{"coinId": user._doc.coinId}) 
                .then(coinHistory => {
                    servicePoints.detailHistory(country, {"pointId": user._doc.pointId})
                    .then(pointHistory => {
                        serviceVtrs.list(country, { $or: [{"from_userId": user._doc._id}, {"to_userId": user._doc._id}], "completed":{$exists: true} })
                        .then(vtrs => {
                            servicePoints.listTrade(country, { $or: [{"from_userId": user._doc._id}, {"to_userId": user._doc._id}], "completed":{$exists: true} })
                            .then(pointTrades => {
                                user._doc['coinInfo'] = coin;
                                user._doc['pointInfo'] = point;
                                user._doc['coinHistory'] = coinHistory;
                                user._doc['pointHistory'] = pointHistory;
                                user._doc['vtrHistory'] = vtrs;
                                user._doc['pointTradeHistory'] = pointTrades;
                
                                bitwebResponse.code = 200;
                                bitwebResponse.data = user;
                                res.status(200).send(bitwebResponse.create())
                            }).catch((err) => {
                                console.error('err=>', err)
                                bitwebResponse.code = 500;
                                bitwebResponse.message = err;
                                res.status(500).send(bitwebResponse.create())
                            })
                        }).catch((err) => {
                            console.error('err=>', err)
                            bitwebResponse.code = 500;
                            bitwebResponse.message = err;
                            res.status(500).send(bitwebResponse.create())
                        })
                    }).catch((err) => {
                        console.error('err=>', err)
                        bitwebResponse.code = 500;
                        bitwebResponse.message = err;
                        res.status(500).send(bitwebResponse.create())
                    })
                }).catch((err) => {
                    console.error('err=>', err)
                    bitwebResponse.code = 500;
                    bitwebResponse.message = err;
                    res.status(500).send(bitwebResponse.create())
                })
            }).catch((err) => {
                console.error('err=>', err)
                bitwebResponse.code = 500;
                bitwebResponse.message = err;
                res.status(500).send(bitwebResponse.create())
            })
        }).catch((err) => {
            console.error('err=>', err)
            bitwebResponse.code = 500;
            bitwebResponse.message = err;
            res.status(500).send(bitwebResponse.create())
        })
    }).catch((err) => {
        console.error('err=>', err)
        bitwebResponse.code = 500;
        bitwebResponse.message = err;
        res.status(500).send(bitwebResponse.create())
    })
});

router.post('/user/withdraw/list', function (req, res, next) {
    let country = dbconfig.country;
    let condition = {};
    if(req.body.length > 0) {
        condition = req.body;
    }
    let bitwebResponse = new BitwebResponse();

    serviceUsers.listWithdrawUser(country, condition)
    .then(users => {
        bitwebResponse.code = 200;
        bitwebResponse.data = users;
        res.status(200).send(bitwebResponse.create())
    }).catch((err) => {
        console.error('err=>', err)
        bitwebResponse.code = 500;
        bitwebResponse.message = err;
        res.status(500).send(bitwebResponse.create())
    })
});

router.post('/history/coin/list', function (req, res, next) {
    let country = dbconfig.country;
    let bitwebResponse = new BitwebResponse();
    let condition = {};
    if(req.body.length > 0) {
        condition = req.body;
    }

    serviceCoins.detailHistory(country,condition) 
    .then(coinHistory => {
        bitwebResponse.code = 200;
        bitwebResponse.data = coinHistory;
        res.status(200).send(bitwebResponse.create())
    }).catch((err) => {
        console.error('err=>', err)
        bitwebResponse.code = 500;
        bitwebResponse.message = err;
        res.status(500).send(bitwebResponse.create())
    })
});

router.post('/gameStation/action/list', function (req, res, next) {
    let country = dbconfig.country;
    let bitwebResponse = new BitwebResponse();
    let condition = {};
    if(req.body.length > 0) {
        condition = req.body;
    }

    serviceGameStation.list(country,condition) 
    .then(gameStationPlays => {
        bitwebResponse.code = 200;
        bitwebResponse.data = gameStationPlays;
        res.status(200).send(bitwebResponse.create())
    }).catch((err) => {
        console.error('err=>', err)
        bitwebResponse.code = 500;
        bitwebResponse.message = err;
        res.status(500).send(bitwebResponse.create())
    })
});


module.exports = router;
