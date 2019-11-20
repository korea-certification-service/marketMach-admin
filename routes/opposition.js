/**
 * 이의제기 관련 기능
 * 작성자 : Chef Kim
 * 작성일 : 2019-11-20
 */
var express = require('express');
var router = express.Router();
var opposition = require('../backend/controller/opposition');
var sessionChecker = require('../utils/session');

//이의제기 목록 조회 page 호출
router.get('/lists', sessionChecker.sessionChecker, function(req, res, next) {
    res.render('opposition/list', { title: 'Biteweb Admin - 1:1문의' });
});

//이의제기 목록 조회
router.post('/search', function(req, res, next) {
    opposition.listOpposition(req, res);
});

//이의제기 상세보기 page 호출
router.get('/detail/:oppositionId', sessionChecker.sessionChecker, function(req, res, next) {
    res.render('opposition/detail', { title: 'Biteweb Admin - modify', oppositionId: req.params.oppositionId });
});

//이의제기 상세보기
router.get('/detail/info/:country/:oppositionId', function (req, res, next) {
    opposition.getOpposition(req, res);
});

//이의제기 수정
router.put('/:oppositionId', function(req, res, next) {
    opposition.modifyOpposition(req, res);
});

module.exports = router;
