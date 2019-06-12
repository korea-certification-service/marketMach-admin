var express = require('express');
var router = express.Router();
var opposition = require('../backend/controller/opposition');
var sessionChecker = require('../utils/session');

/* GET home page. */
router.get('/lists', sessionChecker.sessionChecker, function(req, res, next) {
    res.render('opposition/list', { title: 'Biteweb Admin - 1:1문의' });
});

router.post('/search', function(req, res, next) {
    opposition.listOpposition(req, res);
});

router.get('/detail/:oppositionId', sessionChecker.sessionChecker, function(req, res, next) {
    res.render('opposition/detail', { title: 'Biteweb Admin - modify', oppositionId: req.params.oppositionId });
});

router.get('/detail/info/:country/:oppositionId', function (req, res, next) {
    opposition.getOpposition(req, res);
});

router.put('/:oppositionId', function(req, res, next) {
    opposition.modifyOpposition(req, res);
});

module.exports = router;
