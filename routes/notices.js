/**
 * 공지사항 관련 기능
 * 작성자 : Chef Kim
 * 작성일 : 2019-11-20
 */
var express = require('express');
var router = express.Router();
var notice = require('../backend/controller/notice');
var sessionChecker = require('../utils/session');

//공지사항 목록 조회 page 호출
router.get('/lists', sessionChecker.sessionChecker, function(req, res, next) {
    res.render('notices/list', { title: 'Biteweb Admin - 공지사항' });
});

//공지사항 목록 조회
router.post('/search', function(req, res, next) {
    notice.listNotices(req, res);
});

//공지사항 등록 page 호출
router.get('/register', function(req, res, next) {
    res.render('notices/register', { title: 'Biteweb Admin - register' });
});

//공지사항 등록
router.post('/', function (req, res, next) {
    notice.addNotice(req, res);
});

//공지사항 상세보기 page 조회
router.get('/detail/:noticeId', function(req, res, next) {
    res.render('notices/detail', { title: 'Biteweb Admin - modify', noticeId: req.params.noticeId });
});

//공지사항 상세보기
router.get('/detail/info/:country/:noticeId', function (req, res, next) {
    notice.getNotice(req, res);
});

//공지사항 수정
router.put('/:noticeId', function(req, res, next) {
    notice.modifyNotice(req, res);
});

//공지사항 삭제
router.delete('/:country/:noticeId', function(req, res, next) {
    notice.removeNotice(req, res);
});

module.exports = router;
