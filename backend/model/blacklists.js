var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var blacklistsSchema = require('../dao/blacklists');

module.exports = mongoose.model('blacklists', blacklistsSchema);
