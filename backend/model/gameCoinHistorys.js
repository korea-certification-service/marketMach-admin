var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var GameCoinHistorysSchema = require('../dao/gameCoinHistorys');

module.exports = mongoose.model('GameCoinHistorys', GameCoinHistorysSchema);
