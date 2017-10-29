var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var path = require('path')
require('app-module-path').addPath(path.join(__dirname, '/routes'))
router.use(bodyParser.urlencoded({ extended: true }));
var aws = require('aws-sdk');
aws.config.update({
  accessKeyId: "",
  secretAccessKey: ""
});

router.post('/sign', function (req, res) {
    var fileName = req.body.filename;
    var fileType = req.body.filetype;
    var s3 = new aws.S3();
    var params = {
        Bucket: "",
        Key: fileName,
        Expires: 60,
        ContentType: fileType
    };
    s3.getSignedUrl('putObject', params, function (err, data) {
        if (err) {
            console.log(err);
            return err;
        } else {
            const returnData = {
                signedRequest: data
            }
            return res.send(JSON.stringify(returnData));
        }
    });
})