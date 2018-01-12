const aws = require('aws-sdk');
const keys = require('../config/keys.js');
const multiparty = require('multiparty');
const fs = require('fs-extra');
const mongoose = require('mongoose');
const mime = require('mime-types');

const User = mongoose.model('users');
const Question = mongoose.model('questions');

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
            if(files.file !== undefined) {
                const file = files.file[0];
                if(mime.lookup(file.path)) {
                    fs.readFile(file.path, function (err, data) {
                        const s3 = new aws.S3();
                        const myBucket = 'profile-picture-images';
                        const params = {Bucket: myBucket, Key: req.session.user._id + "/user_profile" + (req.session.user.profilepictureVersion + 1) + ".jpg", Body: data, ACL: 'public-read'};
                        s3.putObject(params, function(err, data) {
                            if (err) {
                                console.log(err);
                                res.send("done");
                            } else {
                                User.update({_id: req.session.user._id}, {profilepicture: "https://s3-ap-southeast-1.amazonaws.com/profile-picture-images/" + req.session.user._id + "/user_profile" + (req.session.user.profilepictureVersion + 1) + ".jpg", profilepictureVersion: req.session.user.profilepictureVersion + 1 }, function (err, response) {
                                    console.log("Successfully uploaded data to profile-picture-images/" + req.session.user._id + "/user_profile" + (req.session.user.profilepictureVersion + 1) + ".jpg");
                                    res.send("done");
                                });
                            }
                        });
                    });
                } else {
                    res.send('Invalid file detected!');
                }
            } else {
                res.send('No file detected!');
            }
        });
    });

    app.post('/api/uploadCaseAttachment', (req, res) => {
        const form = new multiparty.Form();
        form.parse(req, function(err, fields, files) {

            const caseID = fields.caseID;
            const qID = fields.qID;
            const objID = fields.objID;
            const myBucket = 'case-upload-attachments';
            const s3 = new aws.S3();
            if (files.file!==undefined && files.file!==null){
                const file = files.file[0];
                if(mime.lookup(file.path)) {
                    fs.readFile(file.path, function (err, data) {
                        const params = {
                            Bucket: myBucket,
                            Key: caseID + "/question" + qID + ".jpg",
                            Body: data,
                            ACL: 'public-read'
                        };
                        s3.putObject(params, function (err, data) {
                            if (err) {
                                console.log(err);
                                res.send("done");
                            } else {
                                Question.update({_id: objID}, {attachment: "https://s3-ap-southeast-1.amazonaws.com/case-upload-attachments/" + caseID + "/question" + qID + ".jpg"}, function (err, response) {
                                    console.log("Successfully uploaded data to case-upload-attachments/" + caseID + "/question" + qID + ".jpg");
                                    res.send("done");
                                });
                            }

                        });
                    });
                } else {
                    res.send('Invalid file detected!');
                }
            } else {
                Question.update({_id: objID}, {attachment: ""}, function (err, response) {
                    console.log(response);
                });
                const params = {Bucket: myBucket, Key: caseID + "/question" + qID + ".jpg"};
                s3.getObject(params, function(err, data) {
                    // Handle any error and exit
                    if (err) {
                        // console.log(err);
                    } else {
                        const params = {Bucket: myBucket, Delete: {Objects:[{Key:caseID + "/question" + qID + ".jpg"}]}};
                        s3.deleteObjects(params, function(err, data) {
                            if (err) {
                                // console.log(err);
                            }
                        });
                    }

                    res.send("done");
                })
            }

        });
    });
};


