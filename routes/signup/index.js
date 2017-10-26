var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var path = require('path')
require('app-module-path').addPath(path.join(__dirname, '/routes'))
router.use(bodyParser.urlencoded({ extended: true }));

var User = require('../../models/User');

router.post('/', function (req, res) {
    User.findOne({ username: req.body.username }, function (err, user) {
        if (err) { return res.send(err) }
        if (user) {
            return res.status(409).send({ data: null, message: "user exists" });  
        }
        if (!user) {
            var newUser = new User();
            newUser.username = req.body.username;
            newUser.password = req.body.password;
            newUser.school = req.body.school;
            newUser.year = req.body.year;
            newUser.profilepicture = req.body.profilepicture;
            newUser.usertype = req.body.usertype;
            newUser.save();
            return res.status(201).send({ data: user, message: "user created" });
        }
    });
});

module.exports = router;
