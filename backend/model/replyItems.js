var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var ReplyItemsSchema = require('../dao/replyItems');

module.exports = mongoose.model('ReplyItems', ReplyItemsSchema);
