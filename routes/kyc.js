var express = require('express');
var router = express.Router();
// var community = require('../backend/controller/community');
var sessionChecker = require('../utils/session');
// var BitwebResponse = require('../utils/BitwebResponse');

/* GET home page. */
router.get('/lists', sessionChecker.sessionChecker, function(req, res, next) {
    res.render('kyc/list', { title: 'Biteweb Admin - KYC' });
});

// router.post('/search', function(req, res, next) {
//     community.listCommunitys(req, res);
// });

// router.get('/register', function(req, res, next) {
//     res.render('kyc/register', { title: 'Biteweb Admin - register' });
// });

// router.post('/', function (req, res, next) {
//     community.addCommunity(req, res);
// });

router.get('/detail/:kycId', function(req, res, next) {
    res.render('kyc/detail', { title: 'Biteweb Admin - detail', kycId: req.params.kycId});
});

// router.get('/detail/info/:country/:communityId', function (req, res, next) {
//     community.getCommunity(req, res);
// });

// router.put('/:communityId', function(req, res, next) {
//     community.modifyCommunity(req, res);
// });

// router.delete('/:country/:communityId', function(req, res, next) {
//     community.removeCommunity(req, res);
// });

// router.post('/:country/:communityId/images', function (req, res, next) {
//     community.fileUpload(req, res);
// });

// 페이지 이동 스타일로 변경
// router.get('/write', function(req, res, next) {
//     res.render('kyc/write', { title: 'Biteweb Admin - register' });
// });

// router.get('/modify/:_id', function(req, res, next) {
//     res.render('kyc/modify', { title: 'Biteweb Admin - register', _id: req.params._id });
// });

// router.post('/fileuploads',  function (req, res, next) {
//     let bitwebResponse = new BitwebResponse();
//     let awsS3 = require('../utils/awsS3');
//     let multiUpload = awsS3.multiUpload();

//     multiUpload(req, res, function (err, result) {
//         if (err) {
//             res.status(422).send({errors: [{title: 'Image Upload Error', detail: err.message}]});
//             return;
//         }

//         console.log('req.file=>', JSON.stringify(req.files))
//         let data = {
//             "images": []
//         }
//         for(var i =0; i< req.files.length; i++) {
//             let image = {
//                 "path": req.files[i].location,
//                 "bucket": req.files[i].bucket,
//                 "key": req.files[i].key,
//                 "origin_name": req.files[i].originalname,
//                 "size": req.files[i].size,
//                 "mimetype": req.files[i].mimetype,
//                 "regDate": util.formatDate(new Date().toLocaleString('ko-KR'))
//             }

//             data['images'].push(image);
//         }

//         bitwebResponse.code = 200;
//         bitwebResponse.data = data;
//         res.status(200).send(bitwebResponse.create())
//     });
// });

module.exports = router;
