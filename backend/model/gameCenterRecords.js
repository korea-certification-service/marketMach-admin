var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var gameCenterRecordsSchema = require('../dao/gameCenterRecords');

module.exports = mongoose.model('GameCenterRecord', gameCenterRecordsSchema);
