/**
 * KYC 관련 기능
 * 작성자 : Chef Kim
 * 작성일 : 2019-11-20
 */
var express = require('express');
var router = express.Router();
var kyc = require('../backend/controller/kyc');
var sessionChecker = require('../utils/session');
// var BitwebResponse = require('../utils/BitwebResponse');

//KYC 목록 조회 page 호출
router.get('/lists', sessionChecker.sessionChecker, function(req, res, next) {
    res.render('kyc/list', { title: 'Biteweb Admin - KYC' });
});

//KYC 목록 조회
router.post('/search', function(req, res, next) {
    kyc.list(req, res);
});

//KYC 상세보기 Page 호출
router.get('/detail/:userId', function(req, res, next) {
    res.render('kyc/detail', { title: 'Biteweb Admin - detail', userId: req.params.userId});
});

//KYC 상세보기
router.get('/detail/info/:userId', function (req, res, next) {
    kyc.detail(req, res);
});

//KYC 승인여부 
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
