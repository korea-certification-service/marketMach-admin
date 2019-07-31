var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var GameCenterHistorySchema = require('../dao/gameCenterHistorys');

module.exports = mongoose.model('GameCenterHistory', GameCenterHistorySchema);
