var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var gameCenterSchema = require('../dao/gameCenter');

module.exports = mongoose.model('GameCenter', gameCenterSchema);
