const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MLab
mongoose.connect(keys.mongoURI);

require('app-module-path').addPath(require('path').join(__dirname, '/routes'));

const router = express.Router();
router.use(function (req, res, next) {
    next();
});

/* Start of Middleware configuration */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);
app.use(passport.initialize());
app.use(passport.session());
/* End of Middleware configuration */

app.get('/', (req, res) => {
    res.json({ message: 'Hello World!' });
});

const testRoute = require('test');

app.use('/api', router);
app.use('/test', testRoute);

app.listen(PORT);