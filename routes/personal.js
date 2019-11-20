/**
 * 1:1문의 관련 기능
 * 작성자 : Chef Kim
 * 작성일 : 2019-11-20
 */
var express = require('express');
var router = express.Router();
var personal = require('../backend/controller/personal');
var sessionChecker = require('../utils/session');

//1:1문의 목록 조회 page 호출
router.get('/lists', sessionChecker.sessionChecker, function(req, res, next) {
    res.render('personal/list', { title: 'Biteweb Admin - 1:1문의' });
});

//1:1문의 목록 조회
router.post('/search', function(req, res, next) {
    personal.listPersonal(req, res);
});

//1:1문의 상세보기 page 호출
router.get('/detail/:personalId', sessionChecker.sessionChecker, function(req, res, next) {
    res.render('personal/detail', { title: 'Biteweb Admin - modify', personalId: req.params.personalId });
});

//1:1문의 상세보기
router.get('/detail/info/:country/:personalId', function (req, res, next) {
    personal.getPersonal(req, res);
});

//1:1문의 답변 추가
router.put('/:personalId', function(req, res, next) {
    personal.modifyPersonal(req, res);
});

module.exports = router;
