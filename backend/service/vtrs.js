var db = require('../../utils/db');
var bitwebVtrs = require('./impl/vtrs');
var bitwebUsers = require('./impl/user');
var bitwebCoins = require('./impl/coins');
var bitwebItems = require('./impl/items');
var serviceEscrow = require('./impl/escrow');
var serviceEscrowHistory = require('./impl/escrowHistory');
var serviceCoinHistory = require('./impl/coinHistory');
var util = require('../../utils/util');
function count(country, condition) {
    return new Promise((resolve, reject) => {
        db.connectDB(country)
            .then(() => bitwebVtrs.count(condition))
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
            .then(() => bitwebVtrs.list(condition))
            .then((result) => {
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
} 


function listVtrs(req) {
    let country = req.body.country == undefined ? "KR" : req.body.country;
    let itemId = req.body.itemId;
    let perPage = req.body.perPage == undefined ? 20 : req.body.perPage;
    let pageIdx = req.body.pageIdx == undefined ? 0 : req.body.pageIdx;
    let data = {
        "perPage": perPage,
        "pageIdx": pageIdx
    }
    let body = {};
    if(itemId !== undefined) {
        // body = {
        //     $and: [ {"item._id": itemId} ]
        // };
        body = {
            $and: [ {"_id": itemId} ]
        };
    }

    return new Promise((resolve, reject) => {
        db.connectDB(country)
            .then(() => bitwebItems.getItems(body))
            .then((items) => {
                let itemIds = [];
                for(var i in items) {
                    itemIds.push(items[i]._doc._id);
                }
                let condition = {
                    $and: [ {"item._id": itemIds} ]
                }
                bitwebVtrs.listVtrs(condition, data)
                    .then((vtrs) => {
                        //let result = Object.assign([], tradePoints);
                        for(var i in vtrs) {
                            let selIndex = items.findIndex(function(group){
                                //console.log(group._doc._id + '', vtrs[i]._doc.item._id + '');
                                return (group._doc._id + '') == (vtrs[i]._doc.item._id+ '');
                            })

                            vtrs[i]['_doc']['item'] = items[selIndex];
                        }
                        resolve(vtrs)
                    })
            }).catch((err) => {
            reject(err)
        })
    })

    // return new Promise((resolve, reject) => {
    //     db.connectDB(country)
    //         .then(() => bitwebVtrs.listVtrs(body, data))
    //         .then((vtrs) => {
    //             let itemIds = [];
    //             for(var i in vtrs) {
    //                 itemIds.push(vtrs[i]._doc.item._id);
    //             }
    //             bitwebItems.getItemsByIds(itemIds)
    //                 .then((items) => {
    //                     //let result = Object.assign([], tradePoints);
    //                     for(var i in vtrs) {
    //                         let selIndex = items.findIndex(function(group){
    //                             console.log(group._doc._id + '', vtrs[i]._doc.item._id + '');
    //                             return (group._doc._id + '') == (vtrs[i]._doc.item._id+ '');
    //                         })

    //                         vtrs[i]['_doc']['item'] = items[selIndex];
    //                     }
    //                     resolve(vtrs)
    //                 })
    //         }).catch((err) => {
    //         reject(err)
    //     })
    // })
}

function getVtrById(country, vtrId) {
    return new Promise((resolve, reject) => {
        db.connectDB(country)
            .then(() => bitwebVtrs.getVtrById(vtrId)
                .then((vtr) => {
                    console.log('result=>' , vtr);
                    resolve(vtr);
                })
                .catch((err) => {
                    reject(err)
                })
            )
    })
}

function updateVtrs(country, vtrId, data, buy_status) {
    return new Promise((resolve, reject) => {
        db.connectDB(country)
            .then(() => bitwebVtrs.getVtrById(vtrId)
                .then((vtr) => {
                    if(buy_status != undefined) {
                        bitwebUsers.getByUserId(vtr._doc.from_userId)
                            .then((user) => {
                                let coinId = user._doc.coinId;
                                bitwebCoins.getCoinById(coinId)
                                    .then((coin) => {
                                        let total_price = coin._doc.total_mach + vtr._doc.item.total_price;
                                        let data1 = {"total_mach": total_price};
                                        if(vtr._doc.cryptoCurrencyCode == "BTC") {
                                            total_price = coin._doc.total_btc + vtr._doc.item.total_price;
                                            data1 = {"total_btc": total_price};
                                        } else if(vtr._doc.cryptoCurrencyCode == "ETH") {
                                            total_price = coin._doc.total_ether + vtr._doc.item.total_price;
                                            data1 = {"total_eth": total_price};
                                        } else if(vtr._doc.cryptoCurrencyCode == "ONT") {
                                            total_price = coin._doc.total_ont + vtr._doc.item.total_price;
                                            data1 = {"total_ont": total_price};
                                        } else if(vtr._doc.cryptoCurrencyCode == "ONG") {
                                            total_price = coin._doc.total_ong + vtr._doc.item.total_price;
                                            data1 = {"total_ong": total_price};
                                        }
                                        
                                        bitwebCoins.updateCoin(coinId, data1)
                                            .then(() => {
                                                data['item.status'] = 6;
                                                let data2 = {"status": 6};
                                                bitwebItems.updateItemStatus(vtr._doc.item._id, data2)
                                                    .then(() => {
                                                        bitwebVtrs.updateVtr(vtrId, data)
                                                            .then((result) => {
                                                                let reqDataEscrow = {
                                                                    'status':'completed',
                                                                    'completed_regDate': util.formatDate(new Date().toString())
                                                                }
                                                                serviceEscrow.modify(country,{'vtrId':vtrId},reqDataEscrow)
                                                                .then((modifyEscrow)=> {
                                                                    let reqDataEscrowHistory = {
                                                                        "type": "withdraw",
                                                                        "itemId": vtr._doc.item._id,
                                                                        "vtr": vtr,
                                                                        "cryptoCurrencyCode": vtr._doc.cryptoCurrencyCode,                                                                                           
                                                                        "price": vtr._doc.price,
                                                                        "reqUser":vtr._doc.from_userId,                                    
                                                                        "regDate": util.formatDate(new Date().toString())
                                                                    };
                                                                    reqDataEscrowHistory['escrowId'] = modifyEscrow._doc._id;
                                                                    console.log('req escrow history data =>', reqDataEscrow);
                                                                    serviceEscrowHistory.add(country, reqDataEscrowHistory);
                                                                    
                                                                    let reqCoinHistoryData = {
                                                                        "extType" : "mach",
                                                                        "coinId" : user._doc.coinId,
                                                                        "category" : "deposit",
                                                                        "status" : "success",
                                                                        "currencyCode" : vtr._doc.cryptoCurrencyCode,
                                                                        "amount" : vtr._doc.price,
                                                                        "price" : vtr._doc.price,
                                                                        "totalPrice":vtr._doc.price,
                                                                        "regDate" : util.formatDate(new Date().toString())
                                                                    }
                                                                    serviceCoinHistory.add(country,reqCoinHistoryData)
                                                                    .then(addHistory => {
                                                                        console.log('result=>', result);
                                                                        resolve(result)
                                                                    }).catch((err) => {
                                                                        console.error('update coin error =>', err);
                                                                        let resErr = "처리중 에러 발생";
                                                                        resolve(result)
                                                                    })
                                                                }).catch((err) => {
                                                                    console.error('add history error =>', err);
                                                                    let resErr = "처리중 에러 발생";                                                                    
                                                                    resolve(result)
                                                                })
                                                            })
                                                            .catch((err) => {
                                                                reject(err)
                                                            })
                                                    }).catch((err) => {
                                                    reject(err)
                                                })
                                            })
                                    })
                            })
                    } 
                })
            )
    })
}

function deleteVtrs(country, vtrId) {
    return new Promise((resolve, reject) => {
        db.connectDB(country)
            .then(() => bitwebVtrs.getVtrById(vtrId)
                .then((vtr) => {
                    bitwebUsers.getByUserId(vtr._doc.to_userId)
                        .then((user) => {
                            if(vtr._doc.buy_status != undefined) {
                                let coinId = user._doc.coinId;
                                bitwebCoins.getCoinById(coinId)
                                    .then((coin) => {
                                        let total_mach = coin._doc.total_mach + vtr._doc.item.total_price;
                                        let data1 = {"total_mach": total_mach};
                                        if(vtr._doc.cryptoCurrencyCode == "BTC") {
                                            total_price = coin._doc.total_btc + vtr._doc.item.total_price;
                                            data1 = {"total_btc": total_price};
                                        } else if(vtr._doc.cryptoCurrencyCode == "ETH") {
                                            total_price = coin._doc.total_ether + vtr._doc.item.total_price;
                                            data1 = {"total_eth": total_price};
                                        } else if(vtr._doc.cryptoCurrencyCode == "ONT") {
                                            total_price = coin._doc.total_ont + vtr._doc.item.total_price;
                                            data1 = {"total_ont": total_price};
                                        } else if(vtr._doc.cryptoCurrencyCode == "ONG") {
                                            total_price = coin._doc.total_ong + vtr._doc.item.total_price;
                                            data1 = {"total_ong": total_price};
                                        }

                                        bitwebCoins.updateCoin(coinId, data1)
                                            .then(() => {
                                                let data2 = {"status": 0};
                                                bitwebItems.updateItemStatus(vtr._doc.item._id, data2)
                                                    .then(() => {
                                                        bitwebVtrs.deleteVtr(vtrId)
                                                            .then(()=> {
                                                                bitwebVtrs.deleteVtrTempByItemId(vtr._doc.item._id)
                                                                    .then(()=> {
                                                                        let reqDataEscrow = {
                                                                            'status':'cancelled',
                                                                            'cancelled_regDate': util.formatDate(new Date().toString())
                                                                        }
                                                                        serviceEscrow.modify(country,{'vtrId':vtrId},reqDataEscrow)
                                                                        .then((modifyEscrow)=> {
                                                                            let reqDataEscrowHistory = {
                                                                                "type": "cancel",
                                                                                "itemId": vtr._doc.item._id,
                                                                                "vtr": vtr,
                                                                                "cryptoCurrencyCode": vtr._doc.cryptoCurrencyCode,                                                                                           
                                                                                "price": vtr._doc.price,
                                                                                "reqUser":vtr._doc.to_userId,                                    
                                                                                "regDate": util.formatDate(new Date().toString())
                                                                            };
                                                                            if(modifyEscrow != null) {
                                                                                reqDataEscrowHistory['escrowId'] = modifyEscrow._doc._id;
                                                                                console.log('req escrow history data =>', reqDataEscrow);
                                                                                serviceEscrowHistory.add(country, reqDataEscrowHistory);
                                                                            }
                                                                            
                                                                            let reqCoinHistoryData = {
                                                                                "extType" : "mach",
                                                                                "coinId" : user._doc.coinId,
                                                                                "category" : "deposit",
                                                                                "status" : "success",
                                                                                "currencyCode" : vtr._doc.cryptoCurrencyCode,
                                                                                "amount" : vtr._doc.price,
                                                                                "price" : vtr._doc.price,
                                                                                "totalPrice":vtr._doc.price,
                                                                                "regDate" : util.formatDate(new Date().toString())
                                                                            }
                                                                            serviceCoinHistory.add(country,reqCoinHistoryData)
                                                                            .then(addHistory => {
                                                                                console.log('result=>', vtr);
                                                                                resolve(vtr)
                                                                            }).catch((err) => {
                                                                                console.error('update coin error =>', err);
                                                                                let resErr = "처리중 에러 발생";
                                                                                resolve(vtr)
                                                                            })
                                                                        }).catch((err) => {
                                                                            console.error('add history error =>', err);
                                                                            let resErr = "처리중 에러 발생";                                                                    
                                                                            resolve(vtr)
                                                                        })
                                                                    }).catch((err) => {
                                                                    reject(err)
                                                                })
                                                            }).catch((err) => {
                                                            reject(err)
                                                        })
                                                    }).catch((err) => {
                                                    reject(err)
                                                })
                                            }).catch((err) => {
                                            reject(err)
                                        })
                                    })
                            } else {
                                let data2 = {"status": 0};
                                bitwebItems.updateItemStatus(vtr._doc.item._id, data2)
                                    .then(() => {
                                        bitwebVtrs.deleteVtr(vtrId)
                                            .then(()=> {
                                                bitwebVtrs.deleteVtrTempByItemId(vtr._doc.item._id)
                                                    .then(()=> {
                                                        console.log('result=>', vtr);
                                                        resolve(vtr);
                                                    }).catch((err) => {
                                                    reject(err)
                                                })
                                            }).catch((err) => {
                                            reject(err)
                                        })
                                    }).catch((err) => {
                                    reject(err)
                                })
                            }

                        })
                })
            )
    })
}

exports.count = count;
exports.list = list;
exports.listVtrs = listVtrs;
exports.getVtrById = getVtrById;
exports.updateVtrs = updateVtrs;
exports.deleteVtrs = deleteVtrs;