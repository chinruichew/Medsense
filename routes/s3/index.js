const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const path = require('path');
const keys = require('./config/keys');
require('app-module-path').addPath(path.join(__dirname, '/routes'));
router.use(bodyParser.urlencoded({ extended: true }));
const aws = require('aws-sdk');
aws.config.update({
  accessKeyId: keys.awsAccessKeyId,
  secretAccessKey: keys.awsSecretKey
});

router.post('/sign', function (req, res) {
    const fileName = req.body.filename;
    const fileType = req.body.filetype;
    const s3 = new aws.S3();
    const params = {
        Bucket: "case-upload-images",
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
            };
            return res.send(JSON.stringify(returnData));
        }
    });
});