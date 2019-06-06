var express = require('express');
var router = express.Router();
var faq = require('../backend/controller/faq');
var sessionChecker = require('../utils/session');

/* GET home page. */
router.get('/lists', sessionChecker.sessionChecker, function(req, res, next) {
    res.render('faq/list', { title: 'Biteweb Admin - FAQ' });
});

router.post('/search', function(req, res, next) {
    faq.listFaqs(req, res);
});

router.get('/register', function(req, res, next) {
    res.render('faq/register', { title: 'Biteweb Admin - register' });
});

router.post('/', function (req, res, next) {
    faq.addFaq(req, res);
});

router.get('/detail/:faqId', function(req, res, next) {
    res.render('faq/detail', { title: 'Biteweb Admin - modify', faqId: req.params.faqId });
});

router.get('/detail/info/:country/:faqId', function (req, res, next) {
    faq.getFaq(req, res);
});

router.put('/:faqId', function(req, res, next) {
    faq.modifyFaq(req, res);
});

router.delete('/:country/:faqId', function(req, res, next) {
    faq.removeFaq(req, res);
});

module.exports = router;
