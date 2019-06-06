var express = require('express');
var router = express.Router();
var cms = require('../backend/controller/cms');
var sessionChecker = require('../utils/session');

/* GET home page. */
router.get('/lists', sessionChecker.sessionChecker, function(req, res, next) {
    res.render('cms/list', { title: 'Biteweb Admin - FAQ' });
});

router.post('/search', function(req, res, next) {
    cms.listCms(req, res);
});

router.get('/register', function(req, res, next) {
    res.render('cms/register', { title: 'Biteweb Admin - register' });
});

router.post('/', function (req, res, next) {
    cms.addCms(req, res);
});

router.get('/detail/:cmsId', function(req, res, next) {
    res.render('cms/detail', { title: 'Biteweb Admin - modify', cmsId: req.params.cmsId });
});

router.get('/detail/info/:country/:cmsId', function (req, res, next) {
    cms.getCms(req, res);
});

router.put('/:cmsId', function(req, res, next) {
    cms.modifyCms(req, res);
});

router.delete('/:country/:cmsId', function(req, res, next) {
    cms.removeCms(req, res);
});

module.exports = router;
