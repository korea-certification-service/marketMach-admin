var express = require('express');
var router = express.Router();
var staff = require('../backend/controller/staff');
var sessionChecker = require('../utils/session');

router.get('/lists', sessionChecker.sessionChecker, function(req, res, next) {
    res.render('staffs/list', { title: 'Biteweb Admin - Staffs' });
});

router.post('/search', function(req, res, next) {
    staff.listStaffs(req, res);
});

router.get('/register', function(req, res, next) {
    res.render('staffs/register', { title: 'Biteweb Admin - register' });
});

router.post('/', function (req, res, next) {
    staff.addStaff(req, res);
});

router.get('/detail/:staffId', function(req, res, next) {
    res.render('staffs/detail', { title: 'Biteweb Admin - modify', staffId: req.params.staffId });
});

router.get('/get/:staffId', function (req, res, next) {
    staff.getStaff(req, res);
});

router.put('/:staffId', function(req, res, next) {
    staff.modifyStaff(req, res);
});

router.delete('/:userId', function(req, res, next) {
    staff.removeStaff(req, res);
});

// 페이지 이동 스타일로 변경
router.get('/modify/:staffId', function(req, res, next) {
    res.render('staffs/modify', { title: 'Biteweb Admin - modify', staffId: req.params.staffId });
});

module.exports = router;
