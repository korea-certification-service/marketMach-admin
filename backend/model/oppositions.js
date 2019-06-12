var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var OppositionSchema = require('../dao/oppositions');

module.exports = mongoose.model('Oppositions', OppositionSchema);
