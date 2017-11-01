const mongoose = require('mongoose');
const aws = require('aws-sdk');
const keys = require('../config/keys.js');
aws.config.update({
    accessKeyId: keys.awsAccessKeyId,
    secretAccessKey: keys.awsSecretKey
});

module.exports = app => {
    app.post('/getS3SignedURL', function (req, res) {
        const s3 = new aws.S3();
        const params = {
            Bucket: "case-upload-images",
            Key: req.body.filename,
            Expires: 60,
            ContentType: req.body.filetype
        };
        s3.getSignedUrl('putObject', params, function (err, data) {
            if (err) {
                console.log(err);
                return err;
            } else {
                console.log(data)
                return res.status(201).send({ data: null, message: "s3URL success" });
            }
        });
    });
};


