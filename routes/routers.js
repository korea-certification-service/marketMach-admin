var express = require('express');
var router = express.Router();
var staff = require('../backend/controller/staff');
var sessionChecker = require('../utils/session');

/* GET home page. */
router.get('/header', function(req, res, next) {
    res.render('common/header');
});

router.get('/footer', function(req, res, next) {
    res.render('common/footer');
});

router.get('/', sessionChecker.sessionChecker, function(req, res, next) {
    res.render('login', { title: 'Biteweb Admin - login' });
});

router.get('/login', function(req, res, next) {
    res.render('login', { title: 'Biteweb Admin - login' });
});

router.post('/login', function(req, res, next) {
    staff.login(req, res);
});

router.get('/logout', function(req, res, next) {
    req.session.destroy();
    res.redirect("/");
});

router.get('/dashboard', sessionChecker.sessionChecker, function(req, res, next) {
    res.render('users/list', { title: 'Biteweb Admin - Dashboard' });
});

module.exports = router;
