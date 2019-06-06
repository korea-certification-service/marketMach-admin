var express = require('express');
var router = express.Router();
var notice = require('../backend/controller/notice');
var sessionChecker = require('../utils/session');

/* GET home page. */
router.get('/lists', sessionChecker.sessionChecker, function(req, res, next) {
    res.render('notices/list', { title: 'Biteweb Admin - 공지사항' });
});

router.post('/search', function(req, res, next) {
    notice.listNotices(req, res);
});

router.get('/register', function(req, res, next) {
    res.render('notices/register', { title: 'Biteweb Admin - register' });
});

router.post('/', function (req, res, next) {
    notice.addNotice(req, res);
});

router.get('/detail/:noticeId', function(req, res, next) {
    res.render('notices/detail', { title: 'Biteweb Admin - modify', noticeId: req.params.noticeId });
});

router.get('/detail/info/:country/:noticeId', function (req, res, next) {
    notice.getNotice(req, res);
});

router.put('/:noticeId', function(req, res, next) {
    notice.modifyNotice(req, res);
});

router.delete('/:country/:noticeId', function(req, res, next) {
    notice.removeNotice(req, res);
});

module.exports = router;
