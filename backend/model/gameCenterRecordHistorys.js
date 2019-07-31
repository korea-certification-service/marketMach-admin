var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var gameCenterRecordHistorysSchema = require('../dao/gameCenterRecordHistorys');

module.exports = mongoose.model('GameCenterRecordHistorys', gameCenterRecordHistorysSchema);
