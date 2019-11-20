/**
 * FAQ 관련 기능
 * 작성자 : Chef Kim
 * 작성일 : 2019-11-20
 */
var express = require('express');
var router = express.Router();
var faq = require('../backend/controller/faq');
var sessionChecker = require('../utils/session');

//FAQ 목록 조회 page 호출
router.get('/lists', sessionChecker.sessionChecker, function(req, res, next) {
    res.render('faq/list', { title: 'Biteweb Admin - FAQ' });
});

//FAQ 목록 조회
router.post('/search', function(req, res, next) {
    faq.listFaqs(req, res);
});

//FAQ 등록 page 호출
router.get('/register', function(req, res, next) {
    res.render('faq/register', { title: 'Biteweb Admin - register' });
});

//FAQ 등록
router.post('/', function (req, res, next) {
    faq.addFaq(req, res);
});

//FAQ 상세보기 page 호출
router.get('/detail/:faqId', function(req, res, next) {
    res.render('faq/detail', { title: 'Biteweb Admin - modify', faqId: req.params.faqId });
});

//FAQ 상세보기
router.get('/detail/info/:country/:faqId', function (req, res, next) {
    faq.getFaq(req, res);
});

//FAQ 수정
router.put('/:faqId', function(req, res, next) {
    faq.modifyFaq(req, res);
});

//FAQ 삭제
router.delete('/:country/:faqId', function(req, res, next) {
    faq.removeFaq(req, res);
});

module.exports = router;
