var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var GameCenterExchangeHistorySchema = require('../dao/gameCenterExchangeHistory');

module.exports = mongoose.model('GameCenterExchangeHistory', GameCenterExchangeHistorySchema);
