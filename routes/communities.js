/**
 * 커뮤니티 관련 기능
 * 작성자 : Chef Kim
 * 작성일 : 2019-11-20
 */
var express = require('express');
var router = express.Router();
var community = require('../backend/controller/community');
var sessionChecker = require('../utils/session');
var BitwebResponse = require('../utils/BitwebResponse');

//커뮤니티 목록 조회 page 호출
router.get('/lists', sessionChecker.sessionChecker, function(req, res, next) {
    res.render('communities/list', { title: 'Biteweb Admin - 커뮤니티' });
});

//커뮤니티 목록 조회
router.post('/search', function(req, res, next) {
    community.listCommunitys(req, res);
});

//관리자 커뮤니티 공지 등록 page 호출(현재 사용 안함)
router.get('/register', function(req, res, next) {
    res.render('communities/register', { title: 'Biteweb Admin - register' });
});

//관리자 커뮤니티 공지 등록
router.post('/', function (req, res, next) {
    community.addCommunity(req, res);
});

//커뮤니티 상세 조회 page 호출(현재 사용 안함)
router.get('/detail/:communityId', function(req, res, next) {
    res.render('communities/detail', { title: 'Biteweb Admin - modify', communityId: req.params.communityId });
});

//커뮤니티 상세 조회 
router.get('/detail/info/:country/:communityId', function (req, res, next) {
    community.getCommunity(req, res);
});

//커뮤니티 내용 수정
router.put('/:communityId', function(req, res, next) {
    community.modifyCommunity(req, res);
});

//커뮤니티 삭제
router.delete('/:country/:communityId', function(req, res, next) {
    community.removeCommunity(req, res);
});

//커뮤니티 파일 업로드
router.post('/:country/:communityId/images', function (req, res, next) {
    community.fileUpload(req, res);
});

//관리자 커뮤니티 공지 등록 page 호출
router.get('/write', function(req, res, next) {
    res.render('communities/write', { title: 'Biteweb Admin - register' });
});

//커뮤니티 상세 조회 page 호출
router.get('/modify/:communityId', function(req, res, next) {
    res.render('communities/modify', { title: 'Biteweb Admin - register', communityId: req.params.communityId });
});

//파일 업로드
router.post('/fileuploads',  function (req, res, next) {
    let bitwebResponse = new BitwebResponse();
    let awsS3 = require('../utils/awsS3');
    let multiUpload = awsS3.multiUpload();

    multiUpload(req, res, function (err, result) {
        if (err) {
            res.status(422).send({errors: [{title: 'Image Upload Error', detail: err.message}]});
            return;
        }

        console.log('req.file=>', JSON.stringify(req.files))
        let data = {
            "images": []
        }
        for(var i =0; i< req.files.length; i++) {
            let image = {
                "path": req.files[i].location,
                "bucket": req.files[i].bucket,
                "key": req.files[i].key,
                "origin_name": req.files[i].originalname,
                "size": req.files[i].size,
                "mimetype": req.files[i].mimetype,
                "regDate": util.formatDate(new Date().toLocaleString('ko-KR'))
            }

            data['images'].push(image);
        }

        bitwebResponse.code = 200;
        bitwebResponse.data = data;
        res.status(200).send(bitwebResponse.create())
    });
});

module.exports = router;
