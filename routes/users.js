var express = require('express');
var router = express.Router();
var user = require('../backend/controller/user');
var sessionChecker = require('../utils/session');

router.get('/lists', sessionChecker.sessionChecker, function(req, res, next) {
    res.render('users/list', { title: 'Biteweb Admin - Users' });
});

router.post('/search', function(req, res, next) {
    user.listUsers(req, res);
});

router.put('/auth/email/:userId', function(req, res, next) {
    user.updateAuthEmail(req, res);
});

router.get('/detail/:userId', function(req, res, next) {
    res.render('users/detail', { title: 'Biteweb Admin - modify', userId: req.params.userId });
});

router.get('/get/:country/:userId', function (req, res, next) {
    user.getUser(req, res);
});

router.put('/:userId', function(req, res, next) {
    user.modifyUser(req, res);
});

router.delete('/:country/:userId', function(req, res, next) {
    user.removeUser(req, res);
});

// 페이지 이동 스타일로 변경
router.get('/modify/:userId', function(req, res, next) {
    res.render('users/modify', { title: 'Biteweb Admin - modify', userId: req.params.userId });
});

module.exports = router;