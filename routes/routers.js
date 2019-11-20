/**
 * 로그인 및 메인 페이지 관련 기능
 * 작성자 : Chef Kim
 * 작성일 : 2019-11-20
 */
var express = require('express');
var router = express.Router();
var staff = require('../backend/controller/staff');
var sessionChecker = require('../utils/session');

//공통 header page 호출
router.get('/header', function(req, res, next) {
    res.render('common/header');
});

//공통 footer page 호출
router.get('/footer', function(req, res, next) {
    res.render('common/footer');
});

//로그인 page 호출
router.get('/', sessionChecker.sessionChecker, function(req, res, next) {
    res.render('login', { title: 'Biteweb Admin - login' });
});

//로그인 page 호출
router.get('/login', function(req, res, next) {
    res.render('login', { title: 'Biteweb Admin - login' });
});

//로그인 
router.post('/login', function(req, res, next) {
    staff.login(req, res);
});

//로그아웃
router.get('/logout', function(req, res, next) {
    req.session.destroy();
    res.redirect("/");
});

//메인페이지 이동
router.get('/dashboard', sessionChecker.sessionChecker, function(req, res, next) {
    res.render('users/list', { title: 'Biteweb Admin - Dashboard' });
});

module.exports = router;
