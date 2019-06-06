var express = require('express');
var router = express.Router();
var personal = require('../backend/controller/personal');
var sessionChecker = require('../utils/session');

/* GET home page. */
router.get('/lists', sessionChecker.sessionChecker, function(req, res, next) {
    res.render('personal/list', { title: 'Biteweb Admin - 1:1문의' });
});

router.post('/search', function(req, res, next) {
    personal.listPersonal(req, res);
});

router.get('/detail/:personalId', sessionChecker.sessionChecker, function(req, res, next) {
    res.render('personal/detail', { title: 'Biteweb Admin - modify', personalId: req.params.personalId });
});

router.get('/detail/info/:country/:personalId', function (req, res, next) {
    personal.getPersonal(req, res);
});

router.put('/:personalId', function(req, res, next) {
    personal.modifyPersonal(req, res);
});

module.exports = router;
