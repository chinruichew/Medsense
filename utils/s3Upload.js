const aws = require('aws-sdk');
const keys = require('../config/keys.js');
const multiparty = require('multiparty');
const fs = require('fs');
aws.config.update({
    accessKeyId: keys.awsAccessKeyId,
    secretAccessKey: keys.awsSecretKey
});

module.exports = {
    uploadProfilePicture(req) {
        const form = new multiparty.Form();
        form.parse(req, function(err, fields, files) {
            Object.keys(fields).forEach(function(name) {
                console.log('got field named ' + name);
            });

            Object.keys(files).forEach(function(name) {
                console.log('got file named ' + name);
            });

            const file = files.upload[0];
            fs.readFile(file.path, function (err, data) {
                const s3 = new aws.S3();
                const myBucket = 'case-upload-images';
                const params = {Bucket: myBucket, Key: 'test_key.jpg', Body: data, ACL: 'public-read'};
                s3.putObject(params, function(err, data) {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log("Successfully uploaded data to myBucket/myKey");
                    }
                });
            });

            return "image-test";
        });
    }
};