var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var path = require('path')
require('app-module-path').addPath(path.join(__dirname, '/routes'))
router.use(bodyParser.urlencoded({ extended: true }));

var User = require('../../models/User');

router.get('/findOne', function (req, res) {
    User.findOne({ username: "admin1" }, function (err, user) {
        return res.send({ message: user });
    });
});

module.exports = router;