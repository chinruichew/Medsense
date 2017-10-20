const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
require('app-module-path').addPath(require('path').join(__dirname, '/routes'))

var router = express.Router();
var bodyParser = require('body-parser');

router.use(function (req, res, next) {
    next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.json({ message: 'Hello World!' });
});

var testRoute = require('test');

app.use('/api', router);
app.use('/test', testRoute);

app.listen(PORT);