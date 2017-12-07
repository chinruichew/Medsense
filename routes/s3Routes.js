const aws = require('aws-sdk');
const keys = require('../config/keys.js');
const multiparty = require('multiparty');
const fs = require('fs');

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
                console.log(data);
                return res.status(201).send({ data: null, message: "s3URL success" });
            }
        });
    });

    app.post('/api/uploadProfileImage', (req, res) => {
        const form = new multiparty.Form();
        form.parse(req, function(err, fields, files) {
            const file = files.file[0];
            fs.readFile(file.path, function (err, data) {
                const s3 = new aws.S3();
                const myBucket = 'profile-picture-images';
                const params = {Bucket: myBucket, Key: req.user._id + '/user_profile.jpg', Body: data, ACL: 'public-read'};
                s3.putObject(params, function(err, data) {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log("Successfully uploaded data to profile-picture-images/" + req.user._id + '/user_profile.jpg');
                    }
                });
            });
            res.redirect("/login");
        });
    });
};


