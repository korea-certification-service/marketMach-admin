var express = require('express');
var router = express.Router();
var businessContact = require('../backend/controller/businessContact');
var sessionChecker = require('../utils/session');

/* GET home page. */
router.get('/lists', sessionChecker.sessionChecker, function(req, res, next) {
    res.render('businessContacts/list', { title: 'Biteweb Admin - 제휴 문의' });
});

router.post('/search', function(req, res, next) {
    businessContact.listBusinessContacts(req, res);
});

router.get('/register', function(req, res, next) {
    res.render('businessContacts/register', { title: 'Biteweb Admin - register' });
});

router.post('/', function (req, res, next) {
    businessContact.addBusinessContact(req, res);
});

router.get('/detail/:businessContactId', function(req, res, next) {
    res.render('businessContacts/detail', { title: 'Biteweb Admin - modify', businessContactId: req.params.businessContactId });
});

router.get('/detail/info/:country/:businessContactId', function (req, res, next) {
    businessContact.getBusinessContact(req, res);
});

router.put('/:businessContactId', function(req, res, next) {
    businessContact.modifyBusinessContact(req, res);
});

router.delete('/:country/:businessContactId', function(req, res, next) {
    businessContact.removeBusinessContact(req, res);
});

module.exports = router;
