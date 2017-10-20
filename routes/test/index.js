var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var path = require('path')
require('app-module-path').addPath(path.join(__dirname, '/routes'))

router.use(bodyParser.urlencoded({ extended: true }));
router.get('/', function (req, res) {
    return res.status(500).send("Error 500");
});

module.exports = router;