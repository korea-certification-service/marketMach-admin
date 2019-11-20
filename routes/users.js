/**
 * 마켓마하 사용자 관련 기능
 * 작성자 : Chef Kim
 * 작성일 : 2019-11-20
 */
var express = require('express');
var router = express.Router();
var user = require('../backend/controller/user');
var sessionChecker = require('../utils/session');

//마켓마하 사용자 목록 조회 page 호출
router.get('/lists', sessionChecker.sessionChecker, function(req, res, next) {
    res.render('users/list', { title: 'Biteweb Admin - Users' });
});

//마켓마하 사용자 목록 조회
router.post('/search', function(req, res, next) {
    user.listUsers(req, res);
});

//마켓마하 사용자 이메일 인증 강제 완료 처리
router.put('/auth/email/:userId', function(req, res, next) {
    user.updateAuthEmail(req, res);
});

//마켓마하 사용자 상세조회 page 호출
router.get('/detail/:userId', function(req, res, next) {
    res.render('users/detail', { title: 'Biteweb Admin - modify', userId: req.params.userId });
});

//마켓마하 사용자 상세조회
router.get('/get/:country/:userId', function (req, res, next) {
    user.getUser(req, res);
});

//마켓마하 사용자 수정
router.put('/:userId', function(req, res, next) {
    user.modifyUser(req, res);
});

//마켓마하 사용자 삭제
router.delete('/:country/:userId', function(req, res, next) {
    user.removeUser(req, res);
});

// 페이지 이동 스타일로 변경(현재 사용 안함)
router.get('/modify/:userId', function(req, res, next) {
    res.render('users/modify', { title: 'Biteweb Admin - modify', userId: req.params.userId });
});

module.exports = router;