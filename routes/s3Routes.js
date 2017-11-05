const mongoose = require('mongoose');
const passport = require('passport');
const aws = require('aws-sdk');
const keys = require('../config/keys.js');
const multiparty = require('multiparty');
const fs = require('fs');
const User = require('../models/User');
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
            const file = files.upload[0];
            fs.readFile(file.path, function (err, data) {
                const s3 = new aws.S3();
                const myBucket = 'profile-picture-images';
                const key = 'user_' + 'profile' + '.jpg';
                const params = {Bucket: myBucket, Key: key, Body: data, ACL: 'public-read'};
                s3.putObject(params, function(err, data) {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log("Successfully uploaded data to myBucket/myKey");
                        /*
                        const s3Url = 'https://s3-ap-southeast-1.amazonaws.com/profile-picture-images/' + key;
                        User.findById(auth_user._id, function(err, user) {
                            user.set({profilepicture: s3Url});
                            user.save(function(err, updatedUser) {
                                res.send(updatedUser);
                            });
                        });
                        */
                    }
                });
            });

            res.redirect("/");
        });
    });
};


