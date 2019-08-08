var express = require('express');
var router = express.Router();
var kyc = require('../backend/controller/kyc');
var sessionChecker = require('../utils/session');
// var BitwebResponse = require('../utils/BitwebResponse');

/* GET home page. */
router.get('/lists', sessionChecker.sessionChecker, function(req, res, next) {
    res.render('kyc/list', { title: 'Biteweb Admin - KYC' });
});

router.post('/search', function(req, res, next) {
    kyc.list(req, res);
});

router.get('/detail/:userId', function(req, res, next) {
    res.render('kyc/detail', { title: 'Biteweb Admin - detail', userId: req.params.userId});
});

router.get('/detail/info/:userId', function (req, res, next) {
    kyc.detail(req, res);
});

router.put('/:userId', function(req, res, next) {
    kyc.modify(req, res);
});

// router.delete('/:country/:communityId', function(req, res, next) {
//     community.removeCommunity(req, res);
// });

// router.post('/:country/:communityId/images', function (req, res, next) {
//     community.fileUpload(req, res);
// });

module.exports = router;
