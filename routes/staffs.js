/**
 * 관리자 관련 기능
 * 작성자 : Chef Kim
 * 작성일 : 2019-11-20
 */
var express = require('express');
var router = express.Router();
var staff = require('../backend/controller/staff');
var sessionChecker = require('../utils/session');

//관리자 목록 조회 page 호출
router.get('/lists', sessionChecker.sessionChecker, function(req, res, next) {
    res.render('staffs/list', { title: 'Biteweb Admin - Staffs' });
});

//관리자 목록 조회
router.post('/search', function(req, res, next) {
    staff.listStaffs(req, res);
});

//관리자 등록 page 호출
router.get('/register', function(req, res, next) {
    res.render('staffs/register', { title: 'Biteweb Admin - register' });
});

//관리자 등록
router.post('/', function (req, res, next) {
    staff.addStaff(req, res);
});

//관리자 상세보기 page 호출
router.get('/detail/:staffId', function(req, res, next) {
    res.render('staffs/detail', { title: 'Biteweb Admin - modify', staffId: req.params.staffId });
});

//관리자 상세보기
router.get('/get/:staffId', function (req, res, next) {
    staff.getStaff(req, res);
});

//관리자 수정
router.put('/:staffId', function(req, res, next) {
    staff.modifyStaff(req, res);
});

//관리자 삭제
router.delete('/:userId', function(req, res, next) {
    staff.removeStaff(req, res);
});

//관리자 상세보기 page 호출 - 페이지 이동 스타일로 변경(현재 사용 안함)
router.get('/modify/:staffId', function(req, res, next) {
    res.render('staffs/modify', { title: 'Biteweb Admin - modify', staffId: req.params.staffId });
});

module.exports = router;
